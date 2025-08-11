import { Text, View } from "react-native";
import { styles } from "../constants/styles";

export default function TimeSheetScreen({ route }) {

    const workout = route.params.workout;

  return (
    <View style={[styles.screen, styles.container]}>
        <Text>{workout.id}</Text>
    </View>
  );
}