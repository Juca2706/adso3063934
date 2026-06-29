import { API_URL } from "../config/api";

export async function loginRequest(username, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Login failed");
    }

    return data; // { token: "..." }
}

export async function registerRequest(username, password) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Registration failed");
    }

    return data; // { message: "User Registered!" }
}

export async function logoutRequest(token) {
    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Logout failed");
    }

    return data;
}