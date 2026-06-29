import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { loginRequest } from "../services/authService";
import { saveToken } from "../utils/authStorage";
import { notifySuccess, notifyError } from "../utils/notify";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if (!username || !password) {
            notifyError("Please fill in both fields.");
            return;
        }

        setLoading(true);
        try {
            const data = await loginRequest(username, password);
            await saveToken(data.token);
            notifySuccess("Welcome back!");
            navigation.replace("MainTabs");
        } catch (error) {
            notifyError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
                source={require("../assets/images/bg-fondo.png")}
                style={styles.background}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.logoHeader}>
                        <Image
                            source={require("../assets/images/logo-fastFurious.png")}
                            style={styles.smallLogo}
                            resizeMode="contain"
                        />
                        <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate("Welcome")}>
                            <View style={styles.iconBox}>
                                <Ionicons name="home-outline" size={18} color="#F8F8FF" />
                            </View>
                            <Text style={styles.btnBackText}>Home</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.middleArea}>
                        <View style={styles.authCard}>
                            <View style={styles.cardIcon}>
                                <Ionicons name="log-in-outline" size={40} color="#F8F8FF" />
                            </View>

                            <Text style={styles.cardTitle}>SIGN IN</Text>

                            <View style={styles.form}>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="person-outline" size={18} color="#F8F8FF" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Username"
                                        placeholderTextColor="rgba(248,248,255,0.65)"
                                        autoCapitalize="none"
                                        value={username}
                                        onChangeText={setUsername}
                                        returnKeyType="next"
                                    />
                                </View>

                                <View style={styles.inputWrapper}>
                                    <Ionicons name="key-outline" size={18} color="#F8F8FF" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        placeholderTextColor="rgba(248,248,255,0.65)"
                                        secureTextEntry
                                        value={password}
                                        onChangeText={setPassword}
                                        returnKeyType="done"
                                        onSubmitEditing={handleLogin}
                                    />
                                </View>

                                <TouchableOpacity style={styles.btnSignIn} onPress={handleLogin} disabled={loading}>
                                    <Ionicons name="log-in-outline" size={18} color="#F8F8FF" />
                                    <Text style={styles.btnSignInText}>{loading ? "Loading..." : "Sign In"}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.cardFooter}>
                                <Text style={styles.footerText}>You don't have an account?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                    <Text style={styles.link}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </TouchableWithoutFeedback>
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
    btnBack: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8F8FF",
        borderRadius: 20,
        paddingRight: 12,
        height: 36,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 20,
        backgroundColor: "rgba(28,23,20,0.912)",
        justifyContent: "center",
        alignItems: "center",
    },
    btnBackText: { color: "#1C0D02", fontWeight: "bold", marginLeft: 8 },
    middleArea: { flex: 1, justifyContent: "center" },
    authCard: {
        backgroundColor: "rgba(28,23,20,0.70)",
        width: "88%",
        alignSelf: "center",
        borderRadius: 10,
        borderTopWidth: 6,
        borderTopColor: "#F8F8FF",
        padding: 20,
        paddingTop: 50,
        alignItems: "center",
    },
    cardIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(0,0,0,0.96)",
        justifyContent: "center",
        alignItems: "center",
        marginTop: -100,
        marginBottom: 20,
    },
    cardTitle: { fontSize: 20, color: "#F8F8FF", fontWeight: "bold", marginBottom: 20 },
    form: { width: "100%", gap: 16 },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
        borderWidth: 1,
        borderColor: "#444",
        borderRadius: 6,
        height: 52,
        paddingHorizontal: 14,
    },
    inputIcon: { marginRight: 10 },
    input: { flex: 1, color: "#F8F8FF", fontSize: 14 },
    btnSignIn: {
        height: 40,
        borderWidth: 2,
        borderColor: "#F8F8FF",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: "60%",
        alignSelf: "center",
        marginTop: 8,
    },
    btnSignInText: { color: "#F8F8FF", fontWeight: "bold" },
    cardFooter: { flexDirection: "row", marginTop: 24, gap: 6 },
    footerText: { color: "#F8F8FF" },
    link: { color: "#FF8800", fontWeight: "bold" },
});