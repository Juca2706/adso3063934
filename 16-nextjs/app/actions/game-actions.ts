'use server'
import { prisma } from "../../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { z } from "zod";

const GameSchema = z.object({
    title: z.string().min(3, "Título muy corto"),
    developer: z.string().min(2, "Nombre de desarrollador requerido"),
    genre: z.string().min(2, "Género requerido"),
    description: z.string().min(10, "Descripción más detallada, por favor"),
    price: z.coerce.number().gt(0, "El precio debe ser mayor a 0"),
    console_id: z.coerce.number(),
    releasedate: z.string(),
});

// --- FUNCIONES DE APOYO (READ) ---
export async function getConsoles() {
    return await prisma.console.findMany({ orderBy: { name: 'asc' } });
}

export async function getGameById(id: string) {
    const numericId = parseInt(id);

    if (isNaN(numericId)) return null; // Si no es un número válido, retornamos null

    return await prisma.game.findUnique({
        where: { id: numericId },
        include: { console: true }
    });
}

// --- ACCIONES (CREATE) ---
export async function createGame(prevState: any, formData: FormData) {
    const validatedFields = GameSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { error: "Revisa los campos", fields: validatedFields.error.flatten().fieldErrors };
    }

    // VALIDACIÓN DE DUPLICADOS
    const existingGame = await prisma.game.findFirst({
        where: { title: { equals: validatedFields.data.title, mode: 'insensitive' } }
    });

    if (existingGame) {
        return { error: "Este juego ya se encuentra registrado en el sistema." };
    }

    let fileName = "no-cover.png";
    const file = formData.get("cover") as File;

    if (file && file.size > 0) {
        // 1. PREPARAR EL NOMBRE: Quitamos cualquier extensión (.avif, .png, etc) y forzamos .jpg
        const nameWithoutExt = path.parse(file.name).name;
        fileName = `${Date.now()}-${nameWithoutExt}.jpg`;

        // 2. CONVERTIR A BUFFER: Pasamos el archivo a un formato que Sharp entienda
        const buffer = Buffer.from(await file.arrayBuffer());

        // 3. PROCESAR CON SHARP: Aquí es donde se convierte de verdad a JPG
        const processedBuffer = await sharp(buffer)
            .resize(600, 800, { fit: 'cover' }) // Mantiene un tamaño estándar para tus Cards
            .jpeg({ quality: 80 })              // Fuerza el formato JPG y optimiza el peso
            .toBuffer();

        // 4. GUARDAR EN DISCO: Usamos el nombre que termina en .jpg
        const uploadPath = path.join(process.cwd(), "public/uploads", fileName);
        await fs.writeFile(uploadPath, processedBuffer);
    }

    // 5. GUARDAR EN BASE DE DATOS: Usamos la variable 'fileName' que ya tiene el .jpg
    await prisma.game.create({
        data: {
            ...validatedFields.data,
            releasedate: new Date(validatedFields.data.releasedate),
            cover: fileName // Esto guardará algo como "1712000000-juego.jpg"
        }
    });

    revalidatePath("/games");
    return { success: true };
}

// --- ACCIONES (UPDATE) ---
export async function updateGame(prevState: any, formData: FormData) {
    const id = parseInt(formData.get("id") as string);
    const validatedFields = GameSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) return { error: "Error de validación" };

    // 1. Buscamos el juego actual para saber qué imagen tiene
    const game = await prisma.game.findUnique({ where: { id } });
    let fileName = game?.cover || "no-cover.png";

    const file = formData.get("cover") as File;

    // 2. Si el usuario subió una imagen nueva (no está vacía)
    if (file && file.size > 0) {
        // PREPARAMOS EL NOMBRE: Forzamos .jpg
        const nameWithoutExt = path.parse(file.name).name;
        const newFileName = `${Date.now()}-${nameWithoutExt}.jpg`;

        const buffer = Buffer.from(await file.arrayBuffer());

        // PROCESAMOS CON SHARP: Convertimos a JPG real
        const processedBuffer = await sharp(buffer)
            .resize(600, 800, { fit: 'cover' })
            .jpeg({ quality: 80 })
            .toBuffer();

        // GUARDAMOS LA NUEVA IMAGEN
        const newPath = path.join(process.cwd(), "public/uploads", newFileName);
        await fs.writeFile(newPath, processedBuffer);

        // 3. LIMPIEZA: Borramos la imagen vieja del equipo
        if (game?.cover && game.cover !== "no-cover.png") {
            const oldPath = path.join(process.cwd(), "public/uploads", game.cover);
            try {
                await fs.unlink(oldPath); // Esto elimina el archivo físico
            } catch (err) {
                console.error("No se pudo borrar el archivo viejo:", err);
                // No detenemos el proceso si el archivo viejo no existe
            }
        }

        // Actualizamos la variable para la base de datos
        fileName = newFileName;
    }

    // 4. Actualizamos en Prisma
    await prisma.game.update({
        where: { id },
        data: {
            ...validatedFields.data,
            releasedate: new Date(validatedFields.data.releasedate),
            cover: fileName
        }
    });

    revalidatePath("/games");
    return { success: true };
}

// --- ACCIONES (DELETE) ---
export async function deleteGame(id: number) {
    try {
        // 1. Buscar el juego para obtener el nombre del archivo de la imagen
        const game = await prisma.game.findUnique({
            where: { id },
            select: { cover: true } // Solo necesitamos el nombre del archivo
        });

        if (!game) {
            return { error: "El juego no existe." };
        }

        // 2. Borrar el archivo físico si no es la imagen por defecto
        if (game.cover && game.cover !== "no-cover.png") {
            const filePath = path.join(process.cwd(), "public/uploads", game.cover);

            try {
                await fs.unlink(filePath);
            } catch (err) {
                // Si el archivo no existe físicamente, imprimimos el error pero 
                // permitimos que continúe para borrar el registro de la DB
                console.error("No se pudo borrar el archivo físico:", err);
            }
        }

        // 3. Borrar el registro de la base de datos
        await prisma.game.delete({ where: { id } });

        // 4. Revalidar la ruta para actualizar la UI
        revalidatePath("/games");

        return { success: true };
    } catch (error) {
        console.error("Delete Error:", error);
        return { error: "Error en el servidor al intentar eliminar el juego." };
    }
} 