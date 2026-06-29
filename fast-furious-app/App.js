import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import CharactersScreen from "./screens/CharactersScreen";
import AutomobilesScreen from "./screens/AutomobilesScreen";
import MyProfileScreen from "./screens/MyProfileScreen";

import CustomTabBar from "./components/CustomTabBar";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs — solo se monta DESPUÉS de iniciar sesión
function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Characters" component={CharactersScreen} />
            <Tab.Screen name="Automobiles" component={AutomobilesScreen} />
            <Tab.Screen name="MyProfile" component={MyProfileScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
}