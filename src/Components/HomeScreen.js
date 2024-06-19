<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
=======
import { Text, View, Button, Image } from "react-native";
>>>>>>> coacher-webview
import { styles } from "../constants/styles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <StatusBar style="auto" />
      <Text>Home Screen</Text>
=======
      <Text>Home Screen</Text>
      <Image style={styles.logo} source={require('../assets/logo.svg')} />
>>>>>>> coacher-webview
      <Button title="Roster" onPress={() => navigation.navigate("Roster")} />
      <Button title="Workouts" onPress={() => navigation.navigate("Workouts")} />
    </View>
  );
}
