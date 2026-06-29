import { useState, useCallback } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    TextInput,
    LayoutAnimation,
    Platform,
    UIManager,
    Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { updateUsername, updatePassword } from "../services/profileService";
import { logoutRequest } from "../services/authService";
import { getToken, removeToken, saveToken } from "../utils/authStorage";
import { notifySuccess, notifyError } from "../utils/notify";
import { isSessionError, handleSessionExpired } from "../utils/sessionGuard";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

function decodeJwtPayload(token) {
    try {
        const payload = token.split(".")[1];
        const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(decoded);
    } catch (error) {
        return null;
    }
}

export default function MyProfileScreen({ navigation }) {
    const [openForm, setOpenForm] = useState(null);
    const [username, setUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [savingUsername, setSavingUsername] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const loadUsername = useCallback(async () => {
        const token = await getToken();
        if (!token) return;
        const payload = decodeJwtPayload(token);
        if (payload?.username) {
            setUsername(payload.username);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadUsername();
        }, [loadUsername])
    );

    function toggleForm(formName) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenForm((prev) => (prev === formName ? null : formName));
    }

    async function handleConfirmLogout() {
        try {
            const token = await getToken();
            await logoutRequest(token);
            notifySuccess("Logged out successfully!");
        } catch (error) {
            notifyError("Logout failed on server, but session was cleared locally.");
        } finally {
            await removeToken();
            setLogoutModalVisible(false);
            navigation.getParent()?.replace("Welcome");
        }
    }

    async function handleSaveUsername() {
        const trimmed = newUsername.trim();
        if (!trimmed) {
            notifyError("Username cannot be empty.");
            return;
        }

        setSavingUsername(true);
        try {
            const data = await updateUsername(trimmed);
            await saveToken(data.token);
            notifySuccess("Username updated successfully!");
            setUsername(trimmed);
            setNewUsername("");
            setOpenForm(null);
        } catch (error) {
            if (isSessionError(error.message)) {
                await handleSessionExpired(navigation);
                return;
            }
            notifyError(error.message);
        } finally {
            setSavingUsername(false);
        }
    }

    function handleCancelUsername() {
        setNewUsername("");
        setOpenForm(null);
    }

    async function handleSavePassword() {
        if (!newPassword || !confirmPassword) {
            notifyError("Please fill in both password fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            notifyError("Passwords do not match.");
            return;
        }

        setSavingPassword(true);
        try {
            await updatePassword(newPassword);
            notifySuccess("Password updated successfully!");
            setNewPassword("");
            setConfirmPassword("");
            setOpenForm(null);
        } catch (error) {
            if (isSessionError(error.message)) {
                await handleSessionExpired(navigation);
                return;
            }
            notifyError(error.message);
        } finally {
            setSavingPassword(false);
        }
    }

    function handleCancelPassword() {
        setNewPassword("");
        setConfirmPassword("");
        setOpenForm(null);
    }

    return (
        <ImageBackground
            source={require("../assets/images/bg-fondo.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                {/* HEADER */}
                <View style={styles.logoHeader}>
                    <Image
                        source={require("../assets/images/logo-fastFurious.png")}
                        style={styles.smallLogo}
                        resizeMode="contain"
                    />
                    <TouchableOpacity style={styles.iconBox} onPress={() => setLogoutModalVisible(true)}>
                        <Ionicons name="log-out-outline" size={35} color="#F8F8FF" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.scrollContent}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* TÍTULO */}
                    <View style={styles.titleSection}>
                        <Ionicons name="person-circle-outline" size={90} color="#F8F8FF" />
                        <Text style={styles.titleText}>My Profile</Text>
                    </View>

                    <View style={styles.profileInfo}>
                        {/* CARD USERNAME */}
                        <View style={styles.profileCard}>
                            <View style={styles.profileCardRow}>
                                <LinearGradient
                                    colors={["#FF8800", "#FF6A00", "#C62828"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={[styles.profileIconBox, { transform: [{ rotate: "-15deg" }] }]}
                                >
                                    <Ionicons
                                        name="create-outline"
                                        size={20}
                                        color="#F8F8FF"
                                        style={{ transform: [{ rotate: "15deg" }] }}
                                    />
                                </LinearGradient>

                                <Text style={styles.profileValue}>{username || "Loading..."}</Text>

                                <TouchableOpacity
                                    style={[styles.profileEditBtn, openForm === "username" && styles.profileEditBtnOpen]}
                                    onPress={() => toggleForm("username")}
                                >
                                    <Ionicons
                                        name="pencil"
                                        size={16}
                                        color="#FF8800"
                                        style={{ transform: [{ rotate: openForm === "username" ? "45deg" : "0deg" }] }}
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* FORM DESPLEGABLE — USERNAME */}
                            {openForm === "username" && (
                                <View style={styles.profileForm}>
                                    <View style={styles.labelRow}>
                                        <Ionicons name="create-outline" size={14} color="#FF8800" />
                                        <Text style={styles.profileFormLabel}>NEW USERNAME</Text>
                                    </View>
                                    <TextInput
                                        style={styles.formInput}
                                        placeholder="Username"
                                        placeholderTextColor="rgba(248,248,255,0.35)"
                                        value={newUsername}
                                        onChangeText={setNewUsername}
                                        autoCapitalize="none"
                                    />

                                    <View style={styles.formActions}>
                                        <TouchableOpacity style={{ flex: 1 }} onPress={handleSaveUsername} disabled={savingUsername}>
                                            <LinearGradient colors={["#4caf50", "#2e7d32"]} style={styles.formBtn}>
                                                <Ionicons name="save-outline" size={16} color="#F8F8FF" />
                                                <Text style={styles.formBtnText}>{savingUsername ? "Saving..." : "Save Changes"}</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flex: 1 }} onPress={handleCancelUsername}>
                                            <LinearGradient colors={["#f44336", "#b71c1c"]} style={styles.formBtn}>
                                                <Ionicons name="close-circle-outline" size={16} color="#F8F8FF" />
                                                <Text style={styles.formBtnText}>Cancel</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>

                        {/* CARD PASSWORD */}
                        <View style={styles.profileCard}>
                            <View style={styles.profileCardRow}>
                                <LinearGradient
                                    colors={["#FF8800", "#FF6A00", "#C62828"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={[styles.profileIconBox, { transform: [{ rotate: "-15deg" }] }]}
                                >
                                    <Ionicons
                                        name="key-outline"
                                        size={20}
                                        color="#F8F8FF"
                                        style={{ transform: [{ rotate: "15deg" }] }}
                                    />
                                </LinearGradient>

                                <Text style={styles.profileValue}>••••••••••••••••</Text>

                                <TouchableOpacity
                                    style={[styles.profileEditBtn, openForm === "password" && styles.profileEditBtnOpen]}
                                    onPress={() => toggleForm("password")}
                                >
                                    <Ionicons
                                        name="pencil"
                                        size={16}
                                        color="#FF8800"
                                        style={{ transform: [{ rotate: openForm === "password" ? "45deg" : "0deg" }] }}
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* FORM DESPLEGABLE — PASSWORD */}
                            {openForm === "password" && (
                                <View style={styles.profileForm}>
                                    <View style={styles.labelRow}>
                                        <Ionicons name="key-outline" size={14} color="#FF8800" />
                                        <Text style={styles.profileFormLabel}>NEW PASSWORD</Text>
                                    </View>
                                    <TextInput
                                        style={styles.formInput}
                                        placeholder="••••••••••••••••"
                                        placeholderTextColor="rgba(248,248,255,0.35)"
                                        value={newPassword}
                                        onChangeText={setNewPassword}
                                        secureTextEntry
                                    />

                                    <View style={styles.labelRow}>
                                        <Ionicons name="key-outline" size={14} color="#FF8800" />
                                        <Text style={styles.profileFormLabel}>CONFIRM PASSWORD</Text>
                                    </View>
                                    <TextInput
                                        style={styles.formInput}
                                        placeholder="••••••••••••••••"
                                        placeholderTextColor="rgba(248,248,255,0.35)"
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry
                                    />

                                    <View style={styles.formActions}>
                                        <TouchableOpacity style={{ flex: 1 }} onPress={handleSavePassword} disabled={savingPassword}>
                                            <LinearGradient colors={["#4caf50", "#2e7d32"]} style={styles.formBtn}>
                                                <Ionicons name="save-outline" size={16} color="#F8F8FF" />
                                                <Text style={styles.formBtnText}>{savingPassword ? "Saving..." : "Save Changes"}</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flex: 1 }} onPress={handleCancelPassword}>
                                            <LinearGradient colors={["#f44336", "#b71c1c"]} style={styles.formBtn}>
                                                <Ionicons name="close-circle-outline" size={16} color="#F8F8FF" />
                                                <Text style={styles.formBtnText}>Cancel</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

            {/* ═══════════════ MODAL: CONFIRMAR LOGOUT ═══════════════ */}
            <Modal visible={logoutModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.confirmCard}>
                        <View style={styles.confirmIconWrapper}>
                            <LinearGradient colors={["#FFa733", "#FF8800"]} style={styles.confirmIcon}>
                                <Ionicons name="log-out-outline" size={32} color="#F8F8FF" />
                            </LinearGradient>
                        </View>

                        <Text style={styles.confirmTitle}>Sign Out?</Text>
                        <Text style={styles.confirmMessage}>
                            Are you sure you want to sign out of your account?
                        </Text>

                        <View style={styles.confirmActions}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={handleConfirmLogout}>
                                <LinearGradient colors={["#FFa733", "#FF8800"]} style={styles.modalBtn}>
                                    <Ionicons name="log-out-outline" size={16} color="#F8F8FF" />
                                    <Text style={styles.modalBtnText}>Sign Out</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => setLogoutModalVisible(false)}>
                                <LinearGradient colors={["#666", "#444"]} style={styles.modalBtn}>
                                    <Ionicons name="close-outline" size={16} color="#F8F8FF" />
                                    <Text style={styles.modalBtnText}>Cancel</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    safeArea: { flex: 1 },
    logoHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        paddingHorizontal: 16,
    },
    smallLogo: { width: 140, height: 90 },
    iconBox: { width: 36, height: 36, justifyContent: "center", alignItems: "center" },
    scrollContent: { flex: 1, paddingHorizontal: 16, paddingTop: 6 },
    titleSection: { alignItems: "center", gap: 6, marginBottom: 20 },
    titleText: { fontFamily: "Nosifer-Regular", fontSize: 28, color: "#F8F8FF", fontWeight: "bold", letterSpacing: 2 },

    profileInfo: { gap: 14 },
    profileCard: {
        backgroundColor: "rgba(28,23,20,0.85)",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#F8F8FF",
        overflow: "hidden",
    },
    profileCardRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        padding: 14,
    },
    profileIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    profileValue: {
        fontFamily: "NewRocker-Regular",
        flex: 1,
        color: "#F8F8FF",
        fontSize: 15,
    },
    profileEditBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        borderWidth: 1,
        borderColor: "rgba(248,248,255,0.5)",
        backgroundColor: "rgba(255,136,0,0.12)",
        justifyContent: "center",
        alignItems: "center",
    },
    profileEditBtnOpen: {
        backgroundColor: "rgba(255,136,0,0.22)",
    },

    profileForm: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 6,
    },
    labelRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 6,
    },
    profileFormLabel: {
        fontFamily: "Nosifer-Regular",
        color: "rgba(248,248,255,0.7)",
        fontSize: 11,
        letterSpacing: 1,
    },
    formInput: {
        fontFamily: "NewRocker-Regular",
        backgroundColor: "rgba(0,0,0,0.5)",
        borderWidth: 1,
        borderColor: "#F8F8FF",
        borderRadius: 6,
        height: 42,
        paddingHorizontal: 14,
        color: "#F8F8FF",
    },
    formActions: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
    },
    formBtn: {
        height: 42,
        borderRadius: 21,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    formBtnText: { fontFamily: "NewRocker-Regular", color: "#F8F8FF", fontWeight: "bold", fontSize: 13 },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBtn: { height: 42, borderRadius: 21, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
    modalBtnText: { fontFamily: "NewRocker-Regular", color: "#F8F8FF", fontWeight: "bold", fontSize: 13 },

    confirmCard: {
        width: 300,
        backgroundColor: "rgba(28,23,20,0.97)",
        borderRadius: 16,
        padding: 22,
        alignItems: "center",
    },
    confirmIconWrapper: { marginBottom: 14 },
    confirmIcon: { width: 64, height: 64, borderRadius: 32, justifyContent: "center", alignItems: "center" },
    confirmTitle: { fontFamily: "Nosifer-Regular", color: "#F8F8FF", fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
    confirmMessage: { fontFamily: "NewRocker-Regular", color: "rgba(248,248,255,0.8)", fontSize: 13, textAlign: "center", lineHeight: 19, marginBottom: 20 },
    confirmActions: { flexDirection: "row", gap: 10, width: "100%" },
});