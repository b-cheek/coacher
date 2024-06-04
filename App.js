import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/Components/HomeScreen";
import RosterScreen from "./src/Components/RosterScreen";
import WorkoutScreen from "./src/Components/WorkoutScreen";
import { styles } from "./src/constants/styles";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{contentStyle: styles.systemColorBackground}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Roster" component={RosterScreen} />
        <Stack.Screen name="Workouts" component={WorkoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
