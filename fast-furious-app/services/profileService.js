import { API_URL } from "../config/api";
import { getToken } from "../utils/authStorage";

export async function updateUsername(username) {
    const token = await getToken();
    const response = await fetch(`${API_URL}/updateUsername`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to update username");
    return data; // incluye { message, username, token }
}

export async function updatePassword(newPassword) {
    const token = await getToken();
    const response = await fetch(`${API_URL}/updatePassword`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to update password");
    return data;
}