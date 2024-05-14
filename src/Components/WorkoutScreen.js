import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from '../constants/styles'

export default function WorkoutScreen() {

  return (
    <View style={styles.container}>
      <Text>Workout Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}
