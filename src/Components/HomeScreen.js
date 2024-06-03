import { Text, View, Button } from "react-native";
import { styles } from "../constants/styles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Roster" onPress={() => navigation.navigate("Roster")} />
      <Button title="Workouts" onPress={() => navigation.navigate("Workouts")} />
    </View>
  );
}
