import { API_URL } from "../config/api";
import { getToken } from "../utils/authStorage";

export async function listCars() {
    const token = await getToken();
    const response = await fetch(`${API_URL}/listCars`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to load cars");
    return data;
}

export async function createCar(formValues) {
    const token = await getToken();

    const form = new FormData();
    form.append("name", formValues.name);
    form.append("engine", formValues.engine);
    form.append("power", formValues.power);
    form.append("torque", formValues.torque);
    form.append("acceleration", formValues.acceleration);
    form.append("top_speed", formValues.top_speed);
    form.append("transmission", formValues.transmission);
    form.append("drivetrain", formValues.drivetrain);
    form.append("character_id", formValues.character_id ? String(formValues.character_id) : "");

    if (formValues.image) {
        form.append("image", {
            uri: formValues.image,
            name: "car.jpg",
            type: "image/jpeg",
        });
    }

    const response = await fetch(`${API_URL}/createCar`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to create vehicle");
    return data;
}

export async function updateCar(id, formValues) {
    const token = await getToken();

    const form = new FormData();
    form.append("name", formValues.name);
    form.append("engine", formValues.engine);
    form.append("power", formValues.power);
    form.append("torque", formValues.torque);
    form.append("acceleration", formValues.acceleration);
    form.append("top_speed", formValues.top_speed);
    form.append("transmission", formValues.transmission);
    form.append("drivetrain", formValues.drivetrain);
    form.append("character_id", formValues.character_id ? String(formValues.character_id) : "");

    if (formValues.image) {
        form.append("image", {
            uri: formValues.image,
            name: "car.jpg",
            type: "image/jpeg",
        });
    }

    const response = await fetch(`${API_URL}/updateCar/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to update vehicle");
    return data;
}

export async function deleteCar(id) {
    const token = await getToken();
    const response = await fetch(`${API_URL}/deleteCar/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to delete vehicle");
    return data;
}