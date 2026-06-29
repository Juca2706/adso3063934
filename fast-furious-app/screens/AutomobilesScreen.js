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
    listCars,
    createCar,
    updateCar,
    deleteCar,
} from "../services/automobileService";
import { listCharacters } from "../services/characterService";
import { logoutRequest } from "../services/authService";
import { getToken, removeToken } from "../utils/authStorage";
import { buildImageUrl } from "../utils/imageUrl";
import { notifySuccess, notifyError } from "../utils/notify";

const EMPTY_FORM = {
    name: "",
    engine: "",
    power: "",
    torque: "",
    acceleration: "",
    top_speed: "",
    transmission: "",
    drivetrain: "",
    character_id: "",
    image: null,
};

export default function AutomobilesScreen({ navigation }) {
    const [cars, setCars] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [showModalVisible, setShowModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [pickerView, setPickerView] = useState(false); // false = formulario, true = selector de personaje
    const [pickerTargetForm, setPickerTargetForm] = useState(null); // "add" | "edit"

    const [selectedCar, setSelectedCar] = useState(null);
    const [carToDelete, setCarToDelete] = useState(null);

    const [addForm, setAddForm] = useState(EMPTY_FORM);
    const [editForm, setEditForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);

    // Carga autos y personajes (necesarios para el selector) en paralelo
    const loadData = useCallback(async () => {
        try {
            const [carsData, charactersData] = await Promise.all([listCars(), listCharacters()]);
            setCars(carsData);
            setCharacters(charactersData);
        } catch (error) {
            notifyError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

    function findCharacter(id) {
        if (id === null || id === undefined || id === "") return null;
        return characters.find((c) => String(c.id) === String(id));
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
        setPickerView(false);
        setAddModalVisible(true);
    }

    function openEditModal(car) {
        setEditForm({
            id: car.id,
            name: car.name,
            engine: car.engine,
            power: car.power,
            torque: car.torque,
            acceleration: car.acceleration,
            top_speed: car.top_speed,
            transmission: car.transmission,
            drivetrain: car.drivetrain,
            character_id: car.character_id,
            image: null,
        });
        setPickerView(false);
        setEditModalVisible(true);
    }

    function openShowModal(car) {
        setSelectedCar(car);
        setShowModalVisible(true);
    }

    function openDeleteModal(car) {
        setCarToDelete(car);
        setDeleteModalVisible(true);
    }

    function openCharacterPicker(target) {
        setPickerTargetForm(target);
        setPickerView(true);
    }

    function selectCharacter(character) {
        if (pickerTargetForm === "add") {
            setAddForm((p) => ({ ...p, character_id: character.id }));
        } else {
            setEditForm((p) => ({ ...p, character_id: character.id }));
        }
        setPickerView(false);
    }

    function clearCharacterSelection() {
        if (pickerTargetForm === "add") {
            setAddForm((p) => ({ ...p, character_id: "" }));
        } else {
            setEditForm((p) => ({ ...p, character_id: "" }));
        }
        setPickerView(false);
    }

    async function handleSaveAdd() {
        if (!addForm.name) {
            notifyError("Vehicle name is required.");
            return;
        }

        setSaving(true);
        try {
            await createCar(addForm);
            notifySuccess("Vehicle successfully registered!");
            setAddModalVisible(false);
            await loadData();
        } catch (error) {
            notifyError(error.message);
        } finally {
            setSaving(false);
        }
    }

    async function handleSaveEdit() {
        if (!editForm.name) {
            notifyError("Vehicle name is required.");
            return;
        }

        setSaving(true);
        try {
            await updateCar(editForm.id, editForm);
            notifySuccess("Vehicle updated successfully!");
            setEditModalVisible(false);
            await loadData();
        } catch (error) {
            notifyError(error.message);
        } finally {
            setSaving(false);
        }
    }

    async function handleConfirmDelete() {
        if (!carToDelete) return;

        try {
            await deleteCar(carToDelete.id);
            notifySuccess("Vehicle removed from garage!");
            setDeleteModalVisible(false);
            setCarToDelete(null);
            await loadData();
        } catch (error) {
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

    const selectedCarCharacter = selectedCar?.character_id ? findCharacter(selectedCar.character_id) : null;

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
                        <Ionicons name="car-outline" size={70} color="#F8F8FF" />
                        <Text style={styles.titleText}>Automobiles</Text>
                    </View>

                    {/* BOTÓN NEW AUTOMOBILE */}
                    <View style={styles.actionsRow}>
                        <TouchableOpacity onPress={openAddModal}>
                            <LinearGradient
                                colors={["#4caf50", "#2e7d32"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.btnNew}
                            >
                                <Ionicons name="add-circle-outline" size={20} color="#F8F8FF" />
                                <Text style={styles.btnNewText}>New Automobile</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* LISTA DE AUTOS O ESTADO VACÍO */}
                    {cars.length === 0 ? (
                        <View style={styles.emptyState}>
                            <View style={styles.emptyIconWrapper}>
                                <Ionicons name="car-sport-outline" size={56} color="rgba(255,136,0,0.6)" />
                            </View>
                            <Text style={styles.emptyTitle}>No Automobiles Yet</Text>
                            <Text style={styles.emptyMessage}>
                                The garage is empty. Tap "New Automobile" to register the first vehicle.
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.list}>
                            {cars.map((car) => (
                                <View key={car.id} style={styles.card}>
                                    <Image
                                        source={
                                            car.image_path
                                                ? { uri: buildImageUrl(car.image_path) }
                                                : require("../assets/images/1970 Dodge Charger R-T.jpg")
                                        }
                                        style={styles.cardImage}
                                        resizeMode="cover"
                                    />

                                    <View style={styles.cardActions}>
                                        <TouchableOpacity onPress={() => openEditModal(car)}>
                                            <LinearGradient
                                                colors={["#FFa733", "#FF8800"]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={styles.cardBtn}
                                            >
                                                <Ionicons name="pencil" size={16} color="#F8F8FF" />
                                            </LinearGradient>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => openShowModal(car)}>
                                            <LinearGradient
                                                colors={["#29b6f6", "#0288d1"]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={styles.cardBtn}
                                            >
                                                <Ionicons name="eye" size={16} color="#F8F8FF" />
                                            </LinearGradient>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => openDeleteModal(car)}>
                                            <LinearGradient
                                                colors={["#ef5350", "#c62828"]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={styles.cardBtn}
                                            >
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
            <Modal visible={addModalVisible} transparent animationType="fade" onRequestClose={() => setAddModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        {pickerView && pickerTargetForm === "add" ? (
                            // VISTA: SELECTOR DE PERSONAJE
                            <>
                                <View style={styles.modalHeader}>
                                    <Ionicons name="people-outline" size={22} color="#FF8800" />
                                    <Text style={styles.modalHeaderText}>Select Character</Text>
                                </View>

                                {characters.length === 0 ? (
                                    <View style={[styles.noCarsBox, { margin: 14 }]}>
                                        <Ionicons name="people-outline" size={28} color="rgba(255,136,0,0.5)" />
                                        <Text style={styles.noCarsText}>No characters available yet. Add one in the Characters tab.</Text>
                                    </View>
                                ) : (
                                    <ScrollView style={{ maxHeight: 280 }}>
                                        {characters.map((character) => (
                                            <TouchableOpacity
                                                key={character.id}
                                                style={styles.pickerItem}
                                                onPress={() => selectCharacter(character)}
                                            >
                                                <Image
                                                    source={
                                                        character.image_path
                                                            ? { uri: buildImageUrl(character.image_path) }
                                                            : require("../assets/images/dom.jpg")
                                                    }
                                                    style={styles.pickerItemImg}
                                                />
                                                <Text style={styles.pickerItemText}>{character.full_name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                )}

                                <View style={{ flexDirection: "row", gap: 10, padding: 14 }}>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={clearCharacterSelection}>
                                        <LinearGradient colors={["#666", "#444"]} style={styles.modalBtn}>
                                            <Text style={styles.modalBtnText}>None</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={() => setPickerView(false)}>
                                        <LinearGradient colors={["#f44336", "#b71c1c"]} style={styles.modalBtn}>
                                            <Text style={styles.modalBtnText}>Back</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            // VISTA: FORMULARIO NORMAL
                            <>
                                <View style={styles.modalHeader}>
                                    <Ionicons name="add-circle-outline" size={22} color="#FF8800" />
                                    <Text style={styles.modalHeaderText}>Add New Automobile</Text>
                                </View>

                                <ScrollView style={styles.modalBody}>
                                    <FieldWithIcon icon="create-outline" label="Name:" value={addForm.name} onChangeText={(v) => setAddForm((p) => ({ ...p, name: v }))} />
                                    <FieldWithIcon icon="cog-outline" label="Engine:" value={addForm.engine} onChangeText={(v) => setAddForm((p) => ({ ...p, engine: v }))} />
                                    <FieldWithIcon icon="flash-outline" label="Power:" value={addForm.power} onChangeText={(v) => setAddForm((p) => ({ ...p, power: v }))} />
                                    <FieldWithIcon icon="speedometer-outline" label="Torque:" value={addForm.torque} onChangeText={(v) => setAddForm((p) => ({ ...p, torque: v }))} />
                                    <FieldWithIcon icon="rocket-outline" label="Acceleration:" value={addForm.acceleration} onChangeText={(v) => setAddForm((p) => ({ ...p, acceleration: v }))} />
                                    <FieldWithIcon icon="airplane-outline" label="Top Speed:" value={addForm.top_speed} onChangeText={(v) => setAddForm((p) => ({ ...p, top_speed: v }))} />
                                    <FieldWithIcon icon="settings-outline" label="Transmission:" value={addForm.transmission} onChangeText={(v) => setAddForm((p) => ({ ...p, transmission: v }))} />
                                    <FieldWithIcon icon="sync-outline" label="Drivetrain:" value={addForm.drivetrain} onChangeText={(v) => setAddForm((p) => ({ ...p, drivetrain: v }))} />

                                    <View style={styles.labelRow}>
                                        <Ionicons name="person-outline" size={16} color="#F8F8FF" />
                                        <Text style={styles.fieldLabel}>Character:</Text>
                                    </View>
                                    <TouchableOpacity style={styles.selectField} onPress={() => openCharacterPicker("add")}>
                                        <Text style={styles.selectFieldText}>
                                            {addForm.character_id ? findCharacter(addForm.character_id)?.full_name : "Select Character"}
                                        </Text>
                                        <Ionicons name="chevron-down" size={16} color="#FF8800" />
                                    </TouchableOpacity>

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
                                    <TouchableOpacity
                                        style={{ flex: 1 }}
                                        onPress={() => {
                                            setAddModalVisible(false);
                                            setPickerView(false);
                                        }}
                                    >
                                        <LinearGradient colors={["#f44336", "#b71c1c"]} style={styles.modalBtn}>
                                            <Ionicons name="close-circle-outline" size={16} color="#F8F8FF" />
                                            <Text style={styles.modalBtnText}>Cancel</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* ═══════════════ MODAL: EDIT ═══════════════ */}
            <Modal visible={editModalVisible} transparent animationType="fade" onRequestClose={() => setEditModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        {pickerView && pickerTargetForm === "edit" ? (
                            <>
                                <View style={styles.modalHeader}>
                                    <Ionicons name="people-outline" size={22} color="#FF8800" />
                                    <Text style={styles.modalHeaderText}>Select Character</Text>
                                </View>

                                {characters.length === 0 ? (
                                    <View style={[styles.noCarsBox, { margin: 14 }]}>
                                        <Ionicons name="people-outline" size={28} color="rgba(255,136,0,0.5)" />
                                        <Text style={styles.noCarsText}>No characters available yet. Add one in the Characters tab.</Text>
                                    </View>
                                ) : (
                                    <ScrollView style={{ maxHeight: 280 }}>
                                        {characters.map((character) => (
                                            <TouchableOpacity
                                                key={character.id}
                                                style={styles.pickerItem}
                                                onPress={() => selectCharacter(character)}
                                            >
                                                <Image
                                                    source={
                                                        character.image_path
                                                            ? { uri: buildImageUrl(character.image_path) }
                                                            : require("../assets/images/dom.jpg")
                                                    }
                                                    style={styles.pickerItemImg}
                                                />
                                                <Text style={styles.pickerItemText}>{character.full_name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                )}

                                <View style={{ flexDirection: "row", gap: 10, padding: 14 }}>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={clearCharacterSelection}>
                                        <LinearGradient colors={["#666", "#444"]} style={styles.modalBtn}>
                                            <Text style={styles.modalBtnText}>None</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={() => setPickerView(false)}>
                                        <LinearGradient colors={["#f44336", "#b71c1c"]} style={styles.modalBtn}>
                                            <Text style={styles.modalBtnText}>Back</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.modalHeader}>
                                    <Ionicons name="pencil-outline" size={22} color="#FF8800" />
                                    <Text style={styles.modalHeaderText}>Edit Automobile</Text>
                                </View>

                                <ScrollView style={styles.modalBody}>
                                    <FieldWithIcon icon="create-outline" label="Name:" value={editForm.name} onChangeText={(v) => setEditForm((p) => ({ ...p, name: v }))} />
                                    <FieldWithIcon icon="cog-outline" label="Engine:" value={editForm.engine} onChangeText={(v) => setEditForm((p) => ({ ...p, engine: v }))} />
                                    <FieldWithIcon icon="flash-outline" label="Power:" value={editForm.power} onChangeText={(v) => setEditForm((p) => ({ ...p, power: v }))} />
                                    <FieldWithIcon icon="speedometer-outline" label="Torque:" value={editForm.torque} onChangeText={(v) => setEditForm((p) => ({ ...p, torque: v }))} />
                                    <FieldWithIcon icon="rocket-outline" label="Acceleration:" value={editForm.acceleration} onChangeText={(v) => setEditForm((p) => ({ ...p, acceleration: v }))} />
                                    <FieldWithIcon icon="airplane-outline" label="Top Speed:" value={editForm.top_speed} onChangeText={(v) => setEditForm((p) => ({ ...p, top_speed: v }))} />
                                    <FieldWithIcon icon="settings-outline" label="Transmission:" value={editForm.transmission} onChangeText={(v) => setEditForm((p) => ({ ...p, transmission: v }))} />
                                    <FieldWithIcon icon="sync-outline" label="Drivetrain:" value={editForm.drivetrain} onChangeText={(v) => setEditForm((p) => ({ ...p, drivetrain: v }))} />

                                    <View style={styles.labelRow}>
                                        <Ionicons name="person-outline" size={16} color="#F8F8FF" />
                                        <Text style={styles.fieldLabel}>Character:</Text>
                                    </View>
                                    <TouchableOpacity style={styles.selectField} onPress={() => openCharacterPicker("edit")}>
                                        <Text style={styles.selectFieldText}>
                                            {editForm.character_id ? findCharacter(editForm.character_id)?.full_name : "Select Character"}
                                        </Text>
                                        <Ionicons name="chevron-down" size={16} color="#FF8800" />
                                    </TouchableOpacity>

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
                                    <TouchableOpacity
                                        style={{ flex: 1 }}
                                        onPress={() => {
                                            setEditModalVisible(false);
                                            setPickerView(false);
                                        }}
                                    >
                                        <LinearGradient colors={["#f44336", "#b71c1c"]} style={styles.modalBtn}>
                                            <Ionicons name="close-circle-outline" size={16} color="#F8F8FF" />
                                            <Text style={styles.modalBtnText}>Cancel</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* ═══════════════ MODAL: SHOW ═══════════════ */}
            <Modal visible={showModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalCard, styles.modalCardShow]}>
                        <View style={styles.showHero}>
                            {selectedCar && (
                                <Image
                                    source={
                                        selectedCar.image_path
                                            ? { uri: buildImageUrl(selectedCar.image_path) }
                                            : require("../assets/images/1970 Dodge Charger R-T.jpg")
                                    }
                                    style={styles.showHeroImg}
                                    resizeMode="cover"
                                />
                            )}
                            <LinearGradient
                                colors={["rgba(0,0,0,0.1)", "rgba(28,23,20,0.92)"]}
                                style={styles.showHeroGradient}
                            />
                            <TouchableOpacity
                                style={styles.modalCloseXWrapper}
                                onPress={() => setShowModalVisible(false)}
                            >
                                <LinearGradient colors={["#FFa733", "#FF8800"]} style={styles.modalCloseX}>
                                    <Ionicons name="close" size={16} color="#F8F8FF" />
                                </LinearGradient>
                            </TouchableOpacity>
                            <View style={styles.showHeroInfo}>
                                <Text style={styles.showHeroName}>{selectedCar?.name}</Text>
                            </View>
                        </View>

                        <ScrollView style={styles.showDetails}>
                            <ShowInfoRow icon="cog-outline" label="ENGINE" value={selectedCar?.engine} />
                            <ShowInfoRow icon="flash-outline" label="POWER" value={selectedCar?.power} />
                            <ShowInfoRow icon="speedometer-outline" label="TORQUE" value={selectedCar?.torque} />
                            <ShowInfoRow icon="rocket-outline" label="ACCELERATION" value={selectedCar?.acceleration} />
                            <ShowInfoRow icon="airplane-outline" label="TOP SPEED" value={selectedCar?.top_speed} />
                            <ShowInfoRow icon="settings-outline" label="TRANSMISSION" value={selectedCar?.transmission} />
                            <ShowInfoRow icon="sync-outline" label="DRIVETRAIN" value={selectedCar?.drivetrain} />

                            {/* CARD DESTACADA: PERSONAJE ASOCIADO O ESTADO VACÍO */}
                            {selectedCarCharacter ? (
                                <View style={styles.characterCard}>
                                    <Image
                                        source={
                                            selectedCarCharacter.image_path
                                                ? { uri: buildImageUrl(selectedCarCharacter.image_path) }
                                                : require("../assets/images/dom.jpg")
                                        }
                                        style={styles.characterCardImg}
                                        resizeMode="cover"
                                    />
                                    <LinearGradient
                                        colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.85)"]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.characterCardOverlay}
                                    />
                                    <View style={styles.characterCardInfo}>
                                        <View style={styles.labelRow}>
                                            <Ionicons name="person-outline" size={14} color="#FF8800" />
                                            <Text style={styles.showInfoLabel}>OPERATED BY</Text>
                                        </View>
                                        <Text style={styles.characterCardName}>{selectedCarCharacter.full_name}</Text>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.noCarsBox}>
                                    <Ionicons name="person-outline" size={28} color="rgba(255,136,0,0.5)" />
                                    <Text style={styles.noCarsText}>No family member has driven this vehicle yet</Text>
                                </View>
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

                        <Text style={styles.confirmTitle}>Delete Vehicle?</Text>
                        <Text style={styles.confirmMessage}>
                            Are you sure you want to remove{" "}
                            <Text style={{ fontWeight: "bold", color: "#FF8800" }}>{carToDelete?.name}</Text>{" "}
                            from the garage? This action cannot be undone.
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

function ShowInfoRow({ icon, label, value }) {
    return (
        <View style={styles.showInfoCard}>
            <View style={styles.labelRow}>
                <Ionicons name={icon} size={14} color="#FF8800" />
                <Text style={styles.showInfoLabel}>{label}</Text>
            </View>
            <Text style={styles.showInfoValue}>{value}</Text>
        </View>
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
    titleText: { fontSize: 28, color: "#F8F8FF", fontWeight: "bold", letterSpacing: 2 },

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
    btnNewText: { color: "#F8F8FF", fontWeight: "bold" },

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
    modalHeaderText: { color: "#F8F8FF", fontWeight: "bold", fontSize: 14 },
    modalBody: { padding: 16, maxHeight: 420 },
    labelRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10, marginBottom: 4 },
    fieldLabel: { color: "#F8F8FF" },
    fieldInput: {
        backgroundColor: "rgba(0,0,0,0.5)",
        borderWidth: 1,
        borderColor: "#F8F8FF",
        borderRadius: 6,
        height: 40,
        paddingHorizontal: 12,
        color: "#F8F8FF",
    },
    selectField: {
        backgroundColor: "rgba(0,0,0,0.5)",
        borderWidth: 1,
        borderColor: "#F8F8FF",
        borderRadius: 6,
        height: 40,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    selectFieldText: { color: "#F8F8FF" },
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
    modalBtnText: { color: "#F8F8FF", fontWeight: "bold", fontSize: 13 },

    pickerCard: {
        width: 300,
        backgroundColor: "rgba(28,23,20,0.97)",
        borderRadius: 14,
        overflow: "hidden",
    },
    pickerItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.08)",
    },
    pickerItemImg: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#222" },
    pickerItemText: { color: "#F8F8FF", fontSize: 14 },

    modalCardShow: { width: 320 },
    showHero: { height: 220, position: "relative" },
    showHeroImg: { width: "100%", height: "100%", position: "absolute" },
    showHeroGradient: { position: "absolute", width: "100%", height: "100%" },
    modalCloseXWrapper: { position: "absolute", top: 10, right: 10 },
    modalCloseX: { width: 26, height: 26, borderRadius: 6, justifyContent: "center", alignItems: "center" },
    showHeroInfo: { position: "absolute", bottom: 12, left: 14, right: 14 },
    showHeroName: { color: "#F8F8FF", fontWeight: "bold", fontSize: 16 },
    showDetails: { maxHeight: 320, padding: 14 },
    showInfoCard: {
        backgroundColor: "rgba(0,0,0,0.35)",
        borderLeftWidth: 3,
        borderLeftColor: "#FF8800",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    showInfoLabel: { color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: 1.5 },
    showInfoValue: { color: "#F8F8FF", fontSize: 15, marginTop: 4 },

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

    characterCard: {
        height: 130,
        borderRadius: 10,
        overflow: "hidden",
        position: "relative",
        borderLeftWidth: 4,
        borderLeftColor: "#FF8800",
    },
    characterCardImg: { width: "100%", height: "100%", position: "absolute" },
    characterCardOverlay: { position: "absolute", width: "100%", height: "100%" },
    characterCardInfo: { position: "absolute", bottom: 12, left: 14, right: 14 },
    characterCardName: { color: "#F8F8FF", fontSize: 18, fontWeight: "bold", marginTop: 4 },

    confirmCard: {
        width: 300,
        backgroundColor: "rgba(28,23,20,0.97)",
        borderRadius: 16,
        padding: 22,
        alignItems: "center",
    },
    confirmIconWrapper: { marginBottom: 14 },
    confirmIcon: { width: 64, height: 64, borderRadius: 32, justifyContent: "center", alignItems: "center" },
    confirmTitle: { color: "#F8F8FF", fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    confirmMessage: { color: "rgba(248,248,255,0.8)", fontSize: 13, textAlign: "center", lineHeight: 19, marginBottom: 20 },
    confirmActions: { flexDirection: "row", gap: 10, width: "100%" },
});