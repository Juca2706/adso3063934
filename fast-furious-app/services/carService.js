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