import { View, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

const icons = {
    Dashboard: "grid-outline",
    Characters: "person-outline",
    Automobiles: "car-outline",
    MyProfile: "person-circle-outline",
};

export default function CustomTabBar({ state, navigation }) {
    return (
        <View style={styles.wrapper}>
            <BlurView intensity={40} tint="light" style={styles.navContainer}>
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;

                    return (
                        <TouchableOpacity
                            key={route.key}
                            style={styles.navItem}
                            onPress={() => navigation.navigate(route.name)}
                        >
                            <View style={[styles.navPill, isFocused && styles.navPillActive]}>
                                <Ionicons
                                    name={icons[route.name]}
                                    size={22}
                                    color={isFocused ? "#F8F8FF" : "rgba(50,38,30,0.7)"}
                                />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        bottom: 25,
        left: 14,
        right: 14,
    },
    navContainer: {
        flexDirection: "row",
        height: 58,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "space-around",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(255,136,0,0.3)",
        backgroundColor: "rgba(210,205,200,0.55)",
    },
    navItem: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    navPill: {
        width: 52,
        height: 46,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    navPillActive: {
        backgroundColor: "rgba(28,23,20,0.85)",
    },
});