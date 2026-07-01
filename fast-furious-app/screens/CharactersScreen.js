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
    Modal,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import {
    listCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter,
} from "../services/characterService";
import { listCars } from "../services/carService";
import { logoutRequest } from "../services/authService";
import { getToken, removeToken } from "../utils/authStorage";
import { buildImageUrl } from "../utils/imageUrl";
import { notifySuccess, notifyError } from "../utils/notify";
import { isSessionError, handleSessionExpired } from "../utils/sessionGuard";

const EMPTY_FORM = { full_name: "", alias: "", age: "", actor_name: "", image: null };

// Imágenes de placeholder por defecto
const DEFAULT_CHARACTER_IMAGE = require("../assets/images/no-cover-characters.png");
const DEFAULT_CAR_IMAGE = require("../assets/images/no-cover-automobiles.png");

export default function CharactersScreen({ navigation }) {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [showModalVisible, setShowModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [characterToDelete, setCharacterToDelete] = useState(null);
    const [characterCars, setCharacterCars] = useState([]);

    const [addForm, setAddForm] = useState(EMPTY_FORM);
    const [editForm, setEditForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);

    const loadCharacters = useCallback(async () => {
        try {
            const data = await listCharacters();
            setCharacters(data);
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
            loadCharacters();
        }, [loadCharacters])
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

    async function pickImage(setForm) {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            setForm((prev) => ({ ...prev, image: result.assets[0].uri }));
        }
    }

    function openAddModal() {
        setAddForm(EMPTY_FORM);
        setAddModalVisible(true);
    }

    function openEditModal(character) {
        setEditForm({
            id: character.id,
            full_name: character.full_name,
            alias: character.alias,
            age: String(character.age ?? ""),
            actor_name: character.actor_name,
            image: null,
        });
        setEditModalVisible(true);
    }

    async function openShowModal(character) {
        setSelectedCharacter(character);
        setShowModalVisible(true);

        try {
            const allCars = await listCars();
            const filtered = allCars.filter((car) => car.character_id === character.id);
            setCharacterCars(filtered);
        } catch (error) {
            if (isSessionError(error.message)) {
                setShowModalVisible(false);
                await handleSessionExpired(navigation);
                return;
            }
            setCharacterCars([]);
        }
    }

    function openDeleteModal(character) {
        setCharacterToDelete(character);
        setDeleteModalVisible(true);
    }

    async function handleSaveAdd() {
        if (!addForm.full_name || !addForm.age) {
            notifyError("Name and age are required.");
            return;
        }

        setSaving(true);
        try {
            await createCharacter(addForm);
            notifySuccess("Character created successfully!");
            setAddModalVisible(false);
            await loadCharacters();
        } catch (error) {
            if (isSessionError(error.message)) {
                setAddModalVisible(false);
                await handleSessionExpired(navigation);
                return;
            }
            notifyError(error.message);
        } finally {
            setSaving(false);
        }
    }

    async function handleSaveEdit() {
        if (!editForm.full_name || !editForm.age) {
            notifyError("Name and age are required.");
            return;
        }

        setSaving(true);
        try {
            await updateCharacter(editForm.id, editForm);
            notifySuccess("Character updated successfully!");
            setEditModalVisible(false);
            await loadCharacters();
        } catch (error) {
            if (isSessionError(error.message)) {
                setEditModalVisible(false);
                await handleSessionExpired(navigation);
                return;
            }
            notifyError(error.message);
        } finally {
            setSaving(false);
        }
    }

    async function handleConfirmDelete() {
        if (!characterToDelete) return;

        try {
            await deleteCharacter(characterToDelete.id);
            notifySuccess("Character removed from the family!");
            setDeleteModalVisible(false);
            setCharacterToDelete(null);
            await loadCharacters();
        } catch (error) {
            if (isSessionError(error.message)) {
                setDeleteModalVisible(false);
                await handleSessionExpired(navigation);
                return;
            }
            notifyError(error.message);
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
                    <View style={styles.titleSection}>
                        <Ionicons name="person-outline" size={90} color="#F8F8FF" />
                        <Text style={styles.titleText}>Characters</Text>
                    </View>

                    <View style={styles.actionsRow}>
                        <TouchableOpacity onPress={openAddModal}>
                            <LinearGradient
                                colors={["#4caf50", "#2e7d32"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.btnNew}
                            >
                                <Ionicons name="add-circle-outline" size={20} color="#F8F8FF" />
                                <Text style={styles.btnNewText}>New Character</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {characters.length === 0 ? (
                        <View style={styles.emptyState}>
                            <View style={styles.emptyIconWrapper}>
                                <Ionicons name="people-outline" size={56} color="rgba(255,136,0,0.6)" />
                            </View>
                            <Text style={styles.emptyTitle}>No Characters Yet</Text>
                            <Text style={styles.emptyMessage}>
                                You haven't added any characters to the family. Tap "New Character" to add the first one.
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.list}>
                            {characters.map((character) => (
                                <View key={character.id} style={styles.card}>
                                    <Image
                                        source={
                                            character.image_path
                                                ? { uri: buildImageUrl(character.image_path) }
                                                : DEFAULT_CHARACTER_IMAGE
                                        }
                                        style={styles.cardImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.cardActions}>
                                        <TouchableOpacity onPress={() => openEditModal(character)}>
                                            <LinearGradient colors={["#FFa733", "#FF8800"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cardBtn}>
                                                <Ionicons name="pencil" size={16} color="#F8F8FF" />
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => openShowModal(character)}>
                                            <LinearGradient colors={["#29b6f6", "#0288d1"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cardBtn}>
                                                <Ionicons name="eye" size={16} color="#F8F8FF" />
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => openDeleteModal(character)}>
                                            <LinearGradient colors={["#ef5350", "#c62828"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cardBtn}>
                                                <Ionicons name="trash" size={16} color="#F8F8FF" />
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>

            {/* ═══════════════ MODAL: ADD ═══════════════ */}
            <Modal visible={addModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <View style={styles.modalHeader}>
                            <Ionicons name="add-circle-outline" size={22} color="#FF8800" />
                            <Text style={styles.modalHeaderText}>Add New Character</Text>
                        </View>
                        <ScrollView style={styles.modalBody}>
                            <FieldWithIcon icon="create-outline" label="Character Name:" value={addForm.full_name} onChangeText={(v) => setAddForm((p) => ({ ...p, full_name: v }))} />
                            <FieldWithIcon icon="text-outline" label="Alias:" value={addForm.alias} onChangeText={(v) => setAddForm((p) => ({ ...p, alias: v }))} />
                            <FieldWithIcon icon="calendar-outline" label="Age:" value={addForm.age} onChangeText={(v) => setAddForm((p) => ({ ...p, age: v }))} keyboardType="numeric" />
                            <FieldWithIcon icon="person-outline" label="Actor Name:" value={addForm.actor_name} onChangeText={(v) => setAddForm((p) => ({ ...p, actor_name: v }))} />
                            <View style={styles.labelRow}>
                                <Ionicons name="image-outline" size={16} color="#F8F8FF" />
                                <Text style={styles.fieldLabel}>Image:</Text>
                            </View>
                            <TouchableOpacity style={styles.uploadZone} onPress={() => pickImage(setAddForm)}>
                                {addForm.image ? (
                                    <Image source={{ uri: addForm.image }} style={styles.uploadPreview} resizeMode="cover" />
                                ) : (
                                    <View style={styles.uploadPlaceholder}>
                                        <Ionicons name="cloud-upload-outline" size={36} color="rgba(255,136,0,0.6)" />
                                        <Text style={styles.uploadText}>Tap to upload</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={handleSaveAdd} disabled={saving}>
                                <LinearGradient colors={["#4caf50", "#2e7d32"]} style={styles.modalBtn}>
                                    <Ionicons name="save-outline" size={16} color="#F8F8FF" />
                                    <Text style={styles.modalBtnText}>{saving ? "Saving..." : "Save"}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => setAddModalVisible(false)}>
                                <LinearGradient colors={["#f44336", "#b71c1c"]} style={styles.modalBtn}>
                                    <Ionicons name="close-circle-outline" size={16} color="#F8F8FF" />
                                    <Text style={styles.modalBtnText}>Cancel</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* ═══════════════ MODAL: EDIT ═══════════════ */}
            <Modal visible={editModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <View style={styles.modalHeader}>
                            <Ionicons name="pencil-outline" size={22} color="#FF8800" />
                            <Text style={styles.modalHeaderText}>Edit Character</Text>
                        </View>
                        <ScrollView style={styles.modalBody}>
                            <FieldWithIcon icon="create-outline" label="Character Name:" value={editForm.full_name} onChangeText={(v) => setEditForm((p) => ({ ...p, full_name: v }))} />
                            <FieldWithIcon icon="text-outline" label="Alias:" value={editForm.alias} onChangeText={(v) => setEditForm((p) => ({ ...p, alias: v }))} />
                            <FieldWithIcon icon="calendar-outline" label="Age:" value={editForm.age} onChangeText={(v) => setEditForm((p) => ({ ...p, age: v }))} keyboardType="numeric" />
                            <FieldWithIcon icon="person-outline" label="Actor Name:" value={editForm.actor_name} onChangeText={(v) => setEditForm((p) => ({ ...p, actor_name: v }))} />
                            <View style={styles.labelRow}>
                                <Ionicons name="image-outline" size={16} color="#F8F8FF" />
                                <Text style={styles.fieldLabel}>Image (leave empty to keep current):</Text>
                            </View>
                            <TouchableOpacity style={styles.uploadZone} onPress={() => pickImage(setEditForm)}>
                                {editForm.image ? (
                                    <Image source={{ uri: editForm.image }} style={styles.uploadPreview} resizeMode="cover" />
                                ) : (
                                    <View style={styles.uploadPlaceholder}>
                                        <Ionicons name="cloud-upload-outline" size={36} color="rgba(255,136,0,0.6)" />
                                        <Text style={styles.uploadText}>Tap to upload new image</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={handleSaveEdit} disabled={saving}>
                                <LinearGradient colors={["#4caf50", "#2e7d32"]} style={styles.modalBtn}>
                                    <Ionicons name="save-outline" size={16} color="#F8F8FF" />
                                    <Text style={styles.modalBtnText}>{saving ? "Saving..." : "Save Changes"}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => setEditModalVisible(false)}>
                                <LinearGradient colors={["#f44336", "#b71c1c"]} style={styles.modalBtn}>
                                    <Ionicons name="close-circle-outline" size={16} color="#F8F8FF" />
                                    <Text style={styles.modalBtnText}>Cancel</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* ═══════════════ MODAL: SHOW ═══════════════ */}
            <Modal visible={showModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalCard, styles.modalCardShow]}>
                        <View style={styles.showHero}>
                            {selectedCharacter && (
                                <Image
                                    source={
                                        selectedCharacter.image_path
                                            ? { uri: buildImageUrl(selectedCharacter.image_path) }
                                            : DEFAULT_CHARACTER_IMAGE
                                    }
                                    style={styles.showHeroImg}
                                    resizeMode="cover"
                                />
                            )}
                            <LinearGradient
                                colors={["rgba(0,0,0,0.1)", "rgba(28,23,20,0.92)"]}
                                style={styles.showHeroGradient}
                            />
                            <TouchableOpacity style={styles.modalCloseXWrapper} onPress={() => setShowModalVisible(false)}>
                                <LinearGradient colors={["#FFa733", "#FF8800"]} style={styles.modalCloseX}>
                                    <Ionicons name="close" size={16} color="#F8F8FF" />
                                </LinearGradient>
                            </TouchableOpacity>
                            <View style={styles.showHeroInfo}>
                                <Text style={styles.showHeroName}>{selectedCharacter?.full_name}</Text>
                                {selectedCharacter?.alias && (
                                    <View style={styles.showAliasBadge}>
                                        <Text style={styles.showAliasText}>{selectedCharacter.alias}</Text>
                                    </View>
                                )}
                            </View>
                        </View>

                        <ScrollView style={styles.showDetails}>
                            <View style={styles.showInfoCard}>
                                <Text style={styles.showInfoLabel}>ACTOR NAME</Text>
                                <Text style={styles.showInfoValue}>{selectedCharacter?.actor_name || "N/A"}</Text>
                            </View>
                            <View style={styles.showInfoCard}>
                                <Text style={styles.showInfoLabel}>AGE</Text>
                                <Text style={styles.showInfoValue}>{selectedCharacter?.age} Years Old</Text>
                            </View>

                            {characterCars.length === 0 ? (
                                <View style={styles.noCarsBox}>
                                    <Ionicons name="car-outline" size={28} color="rgba(255,136,0,0.5)" />
                                    <Text style={styles.noCarsText}>No vehicles assigned to this character</Text>
                                </View>
                            ) : (
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.carsRow}
                                    contentContainerStyle={{ gap: 8 }}
                                >
                                    {characterCars.map((car) => (
                                        <Image
                                            key={car.id}
                                            source={
                                                car.image_path
                                                    ? { uri: buildImageUrl(car.image_path) }
                                                    : DEFAULT_CAR_IMAGE
                                            }
                                            style={styles.carThumb}
                                            resizeMode="cover"
                                        />
                                    ))}
                                </ScrollView>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* ═══════════════ MODAL: CONFIRMAR ELIMINACIÓN ═══════════════ */}
            <Modal visible={deleteModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.confirmCard}>
                        <View style={styles.confirmIconWrapper}>
                            <LinearGradient colors={["#ef5350", "#c62828"]} style={styles.confirmIcon}>
                                <Ionicons name="warning-outline" size={32} color="#F8F8FF" />
                            </LinearGradient>
                        </View>
                        <Text style={styles.confirmTitle}>Delete Character?</Text>
                        <Text style={styles.confirmMessage}>
                            Are you sure you want to remove{" "}
                            <Text style={{ fontWeight: "bold", color: "#FF8800" }}>{characterToDelete?.full_name}</Text>{" "}
                            from the family? This action cannot be undone.
                        </Text>
                        <View style={styles.confirmActions}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={handleConfirmDelete}>
                                <LinearGradient colors={["#ef5350", "#c62828"]} style={styles.modalBtn}>
                                    <Ionicons name="trash-outline" size={16} color="#F8F8FF" />
                                    <Text style={styles.modalBtnText}>Delete</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => setDeleteModalVisible(false)}>
                                <LinearGradient colors={["#666", "#444"]} style={styles.modalBtn}>
                                    <Ionicons name="close-outline" size={16} color="#F8F8FF" />
                                    <Text style={styles.modalBtnText}>Cancel</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

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
                        <Text style={styles.confirmMessage}>Are you sure you want to sign out of your account?</Text>
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

function FieldWithIcon({ icon, label, value, onChangeText, keyboardType }) {
    return (
        <>
            <View style={styles.labelRow}>
                <Ionicons name={icon} size={16} color="#F8F8FF" />
                <Text style={styles.fieldLabel}>{label}</Text>
            </View>
            <TextInput
                style={styles.fieldInput}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </>
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
    titleSection: { alignItems: "center", gap: 6, marginBottom: 12 },
    titleText: { fontFamily: "Nosifer-Regular", fontSize: 28, color: "#F8F8FF", fontWeight: "bold", letterSpacing: 2 },
    emptyState: {
        alignItems: "center",
        backgroundColor: "rgba(28,23,20,0.65)",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(255,136,0,0.3)",
        paddingVertical: 40,
        paddingHorizontal: 24,
        marginTop: 10,
    },
    emptyIconWrapper: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "rgba(255,136,0,0.08)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    emptyTitle: { color: "#F8F8FF", fontSize: 17, fontWeight: "bold", marginBottom: 8 },
    emptyMessage: { color: "rgba(248,248,255,0.6)", fontSize: 13, textAlign: "center", lineHeight: 19 },
    actionsRow: { alignItems: "center", marginBottom: 18 },
    btnNew: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 26,
        borderRadius: 22,
    },
    btnNewText: { fontFamily: "NewRocker-Regular", color: "#F8F8FF", fontWeight: "bold" },
    list: { gap: 12 },
    card: { borderRadius: 12, overflow: "hidden", position: "relative" },
    cardImage: { width: "100%", height: 250, backgroundColor: "#222" },
    cardActions: { position: "absolute", top: 10, left: 10, flexDirection: "row", gap: 8 },
    cardBtn: { width: 38, height: 38, borderRadius: 19, justifyContent: "center", alignItems: "center" },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalCard: {
        width: 320,
        maxHeight: "85%",
        backgroundColor: "rgba(28,23,20,0.97)",
        borderRadius: 14,
        overflow: "hidden",
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 14,
        borderTopWidth: 4,
        borderTopColor: "#FF8800",
        borderBottomWidth: 1,
        borderBottomColor: "#FF8800",
    },
    modalHeaderText: { fontFamily: "Nosifer-Regular", color: "#F8F8FF", fontWeight: "bold", fontSize: 14 },
    modalBody: { padding: 16, maxHeight: 380 },
    labelRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10, marginBottom: 4 },
    fieldLabel: { fontFamily: "NewRocker-Regular", color: "#F8F8FF" },
    fieldInput: {
        backgroundColor: "rgba(0,0,0,0.5)",
        borderWidth: 1,
        borderColor: "#F8F8FF",
        borderRadius: 6,
        height: 40,
        paddingHorizontal: 12,
        color: "#F8F8FF",
        fontFamily: "NewRocker-Regular",
    },
    uploadZone: {
        height: 160,
        borderWidth: 2,
        borderColor: "#F8F8FF",
        borderStyle: "dashed",
        borderRadius: 10,
        marginTop: 10,
        overflow: "hidden",
    },
    uploadPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center", gap: 6 },
    uploadText: { color: "rgba(248,248,255,0.5)", fontSize: 12 },
    uploadPreview: { width: "100%", height: "100%" },
    modalFooter: {
        flexDirection: "row",
        gap: 10,
        padding: 14,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.12)",
    },
    modalBtn: { height: 42, borderRadius: 21, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
    modalBtnText: { fontFamily: "NewRocker-Regular", color: "#F8F8FF", fontWeight: "bold", fontSize: 13 },
    modalCardShow: { width: 320 },
    showHero: { height: 220, position: "relative" },
    showHeroImg: { width: "100%", height: "100%", position: "absolute" },
    showHeroGradient: { position: "absolute", width: "100%", height: "100%" },
    modalCloseXWrapper: { position: "absolute", top: 10, right: 10 },
    modalCloseX: { width: 26, height: 26, borderRadius: 6, justifyContent: "center", alignItems: "center" },
    showHeroInfo: { position: "absolute", bottom: 12, left: 14, right: 14 },
    showHeroName: { fontFamily: "Nosifer-Regular", color: "#F8F8FF", fontWeight: "bold", fontSize: 16, marginBottom: 6 },
    showAliasBadge: {
        backgroundColor: "#2e7d32",
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius: 10,
    },
    showAliasText: { fontFamily: "NewRocker-Regular", color: "#F8F8FF", fontSize: 12 },
    showDetails: { maxHeight: 260, padding: 14 },
    showInfoCard: {
        backgroundColor: "rgba(0,0,0,0.35)",
        borderLeftWidth: 3,
        borderLeftColor: "#FF8800",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    showInfoLabel: { fontFamily: "Nosifer-Regular", color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: 1.5 },
    showInfoValue: { fontFamily: "NewRocker-Regular", color: "#F8F8FF", fontSize: 15, marginTop: 4 },
    noCarsBox: {
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.25)",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(255,136,0,0.25)",
        paddingVertical: 18,
        paddingHorizontal: 14,
        marginTop: 4,
        gap: 8,
    },
    noCarsText: { color: "rgba(248,248,255,0.55)", fontSize: 12, textAlign: "center" },
    carsRow: { marginTop: 6 },
    carThumb: { width: 130, height: 85, borderRadius: 8 },
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