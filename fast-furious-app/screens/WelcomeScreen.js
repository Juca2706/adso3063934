import { useRef, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const CAROUSEL_WIDTH = 210;
const CAROUSEL_HEIGHT = 180;

const carouselImages = [
    require("../assets/images/carrusel-img1.jpg"),
    require("../assets/images/carrusel-img2.jpg"),
    require("../assets/images/carrusel-img3.jpg"),
    require("../assets/images/carrusel-img4.jpg"),
];

export default function WelcomeScreen({ navigation }) {
    const scrollRef = useRef(null);
    const currentIndex = useRef(1); // empieza en la 2da imagen, igual que tu layout
    const intervalRef = useRef(null);

    function startAutoScroll() {
        intervalRef.current = setInterval(() => {
            currentIndex.current = (currentIndex.current + 1) % carouselImages.length;
            scrollRef.current?.scrollTo({
                x: currentIndex.current * CAROUSEL_WIDTH,
                animated: true,
            });
        }, 3000);
    }

    function stopAutoScroll() {
        clearInterval(intervalRef.current);
    }

    useEffect(() => {
        // posiciona el scroll inicial en la imagen 2 sin animación
        scrollRef.current?.scrollTo({ x: currentIndex.current * CAROUSEL_WIDTH, animated: false });
        startAutoScroll();
        return () => stopAutoScroll();
    }, []);

    // Cuando el usuario suelta el dedo, sincroniza el índice actual y reinicia el timer
    function handleScrollEnd(event) {
        const offsetX = event.nativeEvent.contentOffset.x;
        currentIndex.current = Math.round(offsetX / CAROUSEL_WIDTH);
        stopAutoScroll();
        startAutoScroll();
    }

    return (
        <ImageBackground
            source={require("../assets/images/bg-fondo.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.logoHeader}>
                    <Image
                        source={require("../assets/images/logo-fastFurious.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.middleArea}>
                    <View style={styles.welcomeCard}>
                        {/* CARRUSEL */}
                        <ScrollView
                            ref={scrollRef}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onTouchStart={stopAutoScroll}
                            onMomentumScrollEnd={handleScrollEnd}
                            style={styles.carouselContainer}
                        >
                            {carouselImages.map((img, index) => (
                                <Image key={index} source={img} style={styles.carouselItem} resizeMode="cover" />
                            ))}
                        </ScrollView>

                        <View style={styles.cardContent}>
                            <Text style={styles.title}>¡WELCOME!</Text>
                            <Text style={styles.paragraph}>
                                Join us and discover the most iconic cars from the "Fast & Furious"
                                saga and the characters who drove them.
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.authNavigation}>
                    <TouchableOpacity style={styles.btnSignIn} onPress={() => navigation.navigate("Login")}>
                        <Ionicons name="log-in-outline" size={20} color="#F8F8FF" />
                        <Text style={styles.btnSignInText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnSignUp} onPress={() => navigation.navigate("Register")}>
                        <Ionicons name="person-add-outline" size={20} color="#FF8800" />
                        <Text style={styles.btnSignUpText}>Sign Up</Text>
                    </TouchableOpacity>

                    {/* BOTÓN TEMPORAL — SOLO PARA VER LA ESTRUCTURA, SE QUITA DESPUÉS */}
                    {/* <TouchableOpacity
                        style={{ position: "absolute", top: 50, right: 16, backgroundColor: "red", padding: 8, borderRadius: 6 }}
                        onPress={() => navigation.navigate("MainTabs")}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>DEV: Tabs</Text>
                    </TouchableOpacity> */}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, backgroundColor: "#000" },
    safeArea: { flex: 1 },
    logoHeader: { alignItems: "center", marginTop: 8 },
    logo: { width: 260, height: 190 },
    middleArea: { flex: 1, justifyContent: "center" },
    welcomeCard: {
        backgroundColor: "rgba(28,23,20,0.855)",
        width: "90%",
        maxWidth: 360,
        alignSelf: "center",
        borderRadius: 10,
        padding: 16,
        marginTop: -125,
    },
    carouselContainer: {
        width: CAROUSEL_WIDTH,
        height: CAROUSEL_HEIGHT,
        alignSelf: "center",
        borderRadius: 12,
        overflow: "hidden",
    },
    carouselItem: {
        width: CAROUSEL_WIDTH,
        height: CAROUSEL_HEIGHT,
    },
    cardContent: { marginTop: 25, paddingHorizontal: 8 },
    title: { fontSize: 22, color: "#F8F8FF", textAlign: "center", marginBottom: 6, fontWeight: "bold" },
    paragraph: { fontSize: 14, color: "#E0D9D9", lineHeight: 20, textAlign: "left" },
    authNavigation: { flexDirection: "row", width: "100%" },
    btnSignIn: { flex: 1, height: 60, borderWidth: 3, borderColor: "#F8F8FF", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
    btnSignInText: { color: "#F8F8FF", fontWeight: "bold", fontSize: 16 },
    btnSignUp: { flex: 1, height: 60, borderWidth: 3, borderColor: "#FF8800", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
    btnSignUpText: { color: "#FF8800", fontWeight: "bold", fontSize: 16 },
});