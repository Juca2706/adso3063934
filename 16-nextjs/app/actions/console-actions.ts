'use server'
import { prisma } from "../../prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { z } from "zod";

// 1. Esquema de Validación con Zod
const ConsoleSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    manufacturer: z.string().min(2, "El fabricante es requerido"),
    description: z.string().min(10, "La descripción debe ser más detallada"),
    releasedate: z.string().min(1, "La fecha de lanzamiento es requerida"),
});

// --- FUNCIONES DE APOYO (READ) ---

export async function getConsoleById(id: string) {
    const numericId = parseInt(id);
    if (isNaN(numericId)) return null;

    return await prisma.console.findUnique({
        where: { id: numericId }
    });
}

// --- ACCIONES (CREATE) ---

export async function createConsole(prevState: any, formData: FormData) {
    const validatedFields = ConsoleSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { error: "Revisa los campos", fields: validatedFields.error.flatten().fieldErrors };
    }

    // VALIDACIÓN DE DUPLICADOS (Por nombre único)
    const existingConsole = await prisma.console.findUnique({
        where: { name: validatedFields.data.name }
    });

    if (existingConsole) {
        return { error: "Esta consola ya existe en el sistema." };
    }

    let fileName = "no-image.png";
    const file = formData.get("image") as File;

    if (file && file.size > 0) {
        const nameWithoutExt = path.parse(file.name).name;
        fileName = `${Date.now()}-${nameWithoutExt}.jpg`;

        const buffer = Buffer.from(await file.arrayBuffer());
        const processedBuffer = await sharp(buffer)
            .resize(800, 600, { fit: 'cover' }) // Formato más horizontal para consolas
            .jpeg({ quality: 80 })
            .toBuffer();

        const uploadPath = path.join(process.cwd(), "public/uploads", fileName);
        await fs.writeFile(uploadPath, processedBuffer);
    }

    await prisma.console.create({
        data: {
            ...validatedFields.data,
            releasedate: new Date(validatedFields.data.releasedate),
            image: fileName
        }
    });

    revalidatePath("/consoles");
    return { success: true };
}

// --- ACCIONES (UPDATE) ---

export async function updateConsole(prevState: any, formData: FormData) {
    const id = parseInt(formData.get("id") as string);
    const validatedFields = ConsoleSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) return { error: "Error de validación" };

    const consoleData = await prisma.console.findUnique({ where: { id } });
    let fileName = consoleData?.image || "no-image.png";

    const file = formData.get("image") as File;

    if (file && file.size > 0) {
        const nameWithoutExt = path.parse(file.name).name;
        const newFileName = `${Date.now()}-${nameWithoutExt}.jpg`;

        const buffer = Buffer.from(await file.arrayBuffer());
        const processedBuffer = await sharp(buffer)
            .resize(800, 600, { fit: 'cover' })
            .jpeg({ quality: 80 })
            .toBuffer();

        const newPath = path.join(process.cwd(), "public/uploads", newFileName);
        await fs.writeFile(newPath, processedBuffer);

        // Limpieza de imagen anterior
        if (consoleData?.image && consoleData.image !== "no-image.png") {
            const oldPath = path.join(process.cwd(), "public/uploads", consoleData.image);
            try { await fs.unlink(oldPath); } catch (err) { console.error(err); }
        }

        fileName = newFileName;
    }

    await prisma.console.update({
        where: { id },
        data: {
            ...validatedFields.data,
            releasedate: new Date(validatedFields.data.releasedate),
            image: fileName
        }
    });

    revalidatePath("/consoles");
    return { success: true };
}

// --- ACCIONES (DELETE) ---

export async function deleteConsole(id: number) {
    try {
        const consoleData = await prisma.console.findUnique({
            where: { id },
            include: { games: true } // Importante checar si tiene juegos
        });

        if (!consoleData) return { error: "La consola no existe." };

        // Validación: No borrar consolas que tengan juegos asociados (Integridad referencial)
        if (consoleData.games.length > 0) {
            return { error: `No puedes eliminar esta consola porque tiene ${consoleData.games.length} juegos asociados.` };
        }

        if (consoleData.image && consoleData.image !== "no-image.png") {
            const filePath = path.join(process.cwd(), "public/uploads", consoleData.image);
            try { await fs.unlink(filePath); } catch (err) { console.error(err); }
        }

        await prisma.console.delete({ where: { id } });
        revalidatePath("/consoles");
        return { success: true };
    } catch (error) {
        return { error: "Error al eliminar la consola." };
    }
}