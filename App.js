import { NavigationContainer } from "@react-navigation/native";
<<<<<<< HEAD
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/Components/HomeScreen";
import RosterScreen from "./src/Components/RosterScreen";
import WorkoutScreen from "./src/Components/WorkoutScreen";

const Stack = createNativeStackNavigator();
=======
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PlatformColor } from "react-native-windows";
import HomeScreen from "./src/Components/HomeScreen";
import RosterScreen from "./src/Components/RosterScreen";
import WorkoutScreen from "./src/Components/WorkoutScreen";
import { styles } from "./src/constants/styles";

const Stack = createStackNavigator();
// const Stack = createNativeStackNavigator();
>>>>>>> coacher-webview

export default function App() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator initialRouteName="Home">
=======
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{
          cardStyle: {backgroundColor: PlatformColor('SolidBackgroundFillColorBase')}, 
          headerStyle: styles.headerStyle,
          headerTintColor: PlatformColor("TextFillColorPrimary")
        }}>
>>>>>>> coacher-webview
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Roster" component={RosterScreen} />
        <Stack.Screen name="Workouts" component={WorkoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
