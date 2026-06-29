import { removeToken } from "./authStorage";
import { notifyError } from "./notify";

const SESSION_ERROR_MESSAGES = [
    "Session expired",
    "Session closed",
    "Invalid Token",
    "Access Denied",
];

export function isSessionError(message) {
    if (!message) return false;
    return SESSION_ERROR_MESSAGES.some((fragment) => message.includes(fragment));
}

export async function handleSessionExpired(navigation, customMessage) {
    await removeToken();
    notifyError(customMessage || "Your session has expired. Please login again.");
    navigation.getParent()?.replace("Welcome");
}