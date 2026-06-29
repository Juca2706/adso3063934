import { API_URL } from "../config/api";
import { getToken } from "../utils/authStorage";

export async function listCharacters() {
    const token = await getToken();
    const response = await fetch(`${API_URL}/listCharacters`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to load characters");
    return data;
}

// formValues = { full_name, alias, age, actor_name, image (uri local o null) }
export async function createCharacter(formValues) {
    const token = await getToken();

    const form = new FormData();
    form.append("full_name", formValues.full_name);
    form.append("alias", formValues.alias);
    form.append("age", String(parseInt(formValues.age, 10) || 0));
    form.append("actor_name", formValues.actor_name);

    if (formValues.image) {
        form.append("image", {
            uri: formValues.image,
            name: "character.jpg",
            type: "image/jpeg",
        });
    }

    const response = await fetch(`${API_URL}/createCharacter`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            // NO pongas Content-Type aquí — fetch lo genera automáticamente con el boundary correcto
        },
        body: form,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to create character");
    return data;
}

export async function updateCharacter(id, formValues) {
    const token = await getToken();

    const form = new FormData();
    form.append("full_name", formValues.full_name);
    form.append("alias", formValues.alias);
    form.append("age", String(parseInt(formValues.age, 10) || 0));
    form.append("actor_name", formValues.actor_name);

    if (formValues.image) {
        form.append("image", {
            uri: formValues.image,
            name: "character.jpg",
            type: "image/jpeg",
        });
    }

    const response = await fetch(`${API_URL}/updateCharacter/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to update character");
    return data;
}

export async function deleteCharacter(id) {
    const token = await getToken();
    const response = await fetch(`${API_URL}/deleteCharacter/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to delete character");
    return data;
}