import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styles } from '../constants/styles'

export default function RosterScreen() {

  return (
    <View style={styles.container}>
      <Text>Roster Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}
