import Toast from "react-native-toast-message";

export function notifySuccess(message) {
    Toast.show({
        type: "success",
        text1: "Success",
        text2: message,
        position: "top",
        visibilityTime: 2500,
    });
}

export function notifyError(message) {
    Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "top",
        visibilityTime: 3000,
    });
}