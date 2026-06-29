import { API_URL } from "../config/api";

// Convierte una ruta guardada en la BD (ej: "images/characters/123.jpg")
// en una URL completa que el <Image> pueda cargar
export function buildImageUrl(imagePath) {
    if (!imagePath) return null;
    // Normaliza separadores de Windows (\) a / por si el backend corre en Windows
    const normalized = imagePath.replace(/\\/g, "/");
    return `${API_URL}/${normalized}`;
}