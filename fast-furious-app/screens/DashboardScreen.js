import { useState, useCallback } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    ActivityIndicator,
    Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Circle } from "react-native-svg";
import { listCharacters } from "../services/characterService";
import { listCars } from "../services/carService";
import { logoutRequest } from "../services/authService";
import { getToken, removeToken } from "../utils/authStorage";
import { notifySuccess, notifyError } from "../utils/notify";
import { isSessionError, handleSessionExpired } from "../utils/sessionGuard";

const PIE_COLORS = [
    "#FF8800",
    "#29b6f6",
    "#4caf50",
    "#ef5350",
    "#ab47bc",
    "#FFa733",
    "#26a69a",
    "#ffca28",
];

function getCoordinatesForPercent(percent, radius, cx, cy) {
    const x = cx + radius * Math.cos(2 * Math.PI * percent);
    const y = cy + radius * Math.sin(2 * Math.PI * percent);
    return [x, y];
}

export default function DashboardScreen({ navigation }) {
    const [characters, setCharacters] = useState([]);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const loadData = useCallback(async () => {
        try {
            const [charactersData, carsData] = await Promise.all([listCharacters(), listCars()]);
            setCharacters(charactersData);
            setCars(carsData);
        } catch (error) {
            if (isSessionError(error.message)) {
                await handleSessionExpired(navigation);
                return;
            }
            notifyError(error.message);
        } finally {
            setLoading(false);
        }
    }, [navigation]);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

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

    if (loading) {
        return (
            <ImageBackground
                source={require("../assets/images/bg-fondo.png")}
                style={styles.background}
                resizeMode="cover"
            >
                <SafeAreaView style={[styles.safeArea, { justifyContent: "center", alignItems: "center" }]}>
                    <ActivityIndicator size="large" color="#FF8800" />
                </SafeAreaView>
            </ImageBackground>
        );
    }

    const carsByCharacter = characters
        .map((character) => ({
            name: character.full_name,
            count: cars.filter((car) => String(car.character_id) === String(character.id)).length,
        }))
        .filter((entry) => entry.count > 0);

    const unassignedCount = cars.filter(
        (car) => !car.character_id || !characters.some((c) => String(c.id) === String(car.character_id))
    ).length;

    if (unassignedCount > 0) {
        carsByCharacter.push({ name: "Unassigned", count: unassignedCount });
    }

    const totalCarsInChart = carsByCharacter.reduce((sum, entry) => sum + entry.count, 0);

    let cumulativePercent = 0;
    const radius = 80;
    const cx = 100;
    const cy = 100;

    const slices = carsByCharacter.map((entry, index) => {
        const percent = totalCarsInChart > 0 ? entry.count / totalCarsInChart : 0;
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent, radius, cx, cy);
        cumulativePercent += percent;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent, radius, cx, cy);
        const largeArcFlag = percent > 0.5 ? 1 : 0;

        const pathData = [
            `M ${cx} ${cy}`,
            `L ${startX} ${startY}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            "Z",
        ].join(" ");

        return { path: pathData, color: PIE_COLORS[index % PIE_COLORS.length], name: entry.name, count: entry.count };
    });

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
                        <Ionicons name="grid-outline" size={90} color="#F8F8FF" />
                        <Text style={styles.titleText}>Dashboard</Text>
                    </View>

                    {/* STAT CARDS */}
                    <View style={styles.statsPanel}>
                        <View style={styles.statCard}>
                            <View style={styles.statInfo}>
                                <Text style={styles.statLabel}>TOTAL CHARACTERS</Text>
                                <Text style={styles.statNumber}>{characters.length}</Text>
                            </View>
                            <LinearGradient
                                colors={["#FF8800", "#FF6A00", "#C62828"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={[styles.statIconBox, { transform: [{ rotate: "15deg" }] }]}
                            >
                                <Ionicons
                                    name="person"
                                    size={28}
                                    color="#F8F8FF"
                                    style={{ transform: [{ rotate: "-15deg" }] }}
                                />
                            </LinearGradient>
                        </View>

                        <View style={styles.statCard}>
                            <View style={styles.statInfo}>
                                <Text style={styles.statLabel}>TOTAL AUTOMOBILES</Text>
                                <Text style={styles.statNumber}>{cars.length}</Text>
                            </View>
                            <LinearGradient
                                colors={["#FF8800", "#FF6A00", "#C62828"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={[styles.statIconBox, { transform: [{ rotate: "15deg" }] }]}
                            >
                                <Ionicons
                                    name="car"
                                    size={28}
                                    color="#F8F8FF"
                                    style={{ transform: [{ rotate: "-15deg" }] }}
                                />
                            </LinearGradient>
                        </View>

                        {/* CHART CARD */}
                        <View style={styles.chartCard}>
                            <Text style={styles.chartTitle}>Cars by Character</Text>

                            {totalCarsInChart === 0 ? (
                                <View style={styles.chartEmptyState}>
                                    <Ionicons name="pie-chart-outline" size={64} color="rgba(255,255,255,0.3)" />
                                    <Text style={styles.chartEmptyText}>No vehicles registered yet</Text>
                                </View>
                            ) : (
                                <View style={styles.chartContent}>
                                    <Svg width={200} height={200} viewBox="0 0 200 200">
                                        {slices.length === 1 ? (
                                            <Circle cx={cx} cy={cy} r={radius} fill={slices[0].color} />
                                        ) : (
                                            slices.map((slice, index) => (
                                                <Path key={index} d={slice.path} fill={slice.color} />
                                            ))
                                        )}
                                    </Svg>

                                    <View style={styles.legend}>
                                        {slices.map((slice, index) => (
                                            <View key={index} style={styles.legendItem}>
                                                <View style={[styles.legendDot, { backgroundColor: slice.color }]} />
                                                <Text style={styles.legendText} numberOfLines={1}>
                                                    {slice.name} ({slice.count})
                                                </Text>
                                            </View>
                                        ))}
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
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContent: { flex: 1, paddingHorizontal: 16, paddingTop: 6 },
    titleSection: { alignItems: "center", gap: 6, marginBottom: 20 },
    titleText: {
        fontFamily: "Nosifer-Regular",
        fontSize: 28,
        color: "#F8F8FF",
        fontWeight: "bold",
        letterSpacing: 2,
    },
    statsPanel: { gap: 12 },
    statCard: {
        backgroundColor: "rgba(28,23,20,0.85)",
        borderRadius: 10,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderLeftWidth: 4,
        borderLeftColor: "#FF8800",
    },
    statInfo: {
        flex: 1,
    },
    statLabel: {
        fontFamily: "Nosifer-Regular",
        fontSize: 12,
        color: "#F8F8FF",
        letterSpacing: 1.5,
        textAlign: "left",
    },
    statNumber: {
        fontFamily: "NewRocker-Regular",
        fontSize: 36,
        color: "#FF8800",
        fontWeight: "bold",
        marginTop: 4,
        textAlign: "center",
    },
    statIconBox: {
        width: 56,
        height: 56,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    chartCard: {
        backgroundColor: "rgba(28,23,20,0.85)",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: "center",
        borderTopWidth: 4,
        borderTopColor: "#FF8800",
    },
    chartTitle: {
        fontFamily: "Nosifer-Regular",
        color: "#F8F8FF",
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 14,
        letterSpacing: 1,
    },
    chartEmptyState: {
        alignItems: "center",
        paddingVertical: 30,
        gap: 10,
    },
    chartEmptyText: {
        color: "rgba(255,255,255,0.5)",
        fontSize: 13,
    },
    chartContent: {
        alignItems: "center",
        width: "100%",
    },
    legend: {
        marginTop: 16,
        width: "100%",
        gap: 8,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    legendText: {
        fontFamily: "NewRocker-Regular",
        color: "#F8F8FF",
        fontSize: 12,
        flex: 1,
    },

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