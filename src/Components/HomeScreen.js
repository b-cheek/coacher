import { Text, View, Button, Image } from "react-native";
import { styles } from "../constants/styles";
import Logo from "./Logo";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Image style={styles.logo} source={require('../assets/logo.svg')} />
      <Button title="Roster" onPress={() => navigation.navigate("Roster")} />
      <Button title="Workouts" onPress={() => navigation.navigate("Workouts")} />
    </View>
  );
}
