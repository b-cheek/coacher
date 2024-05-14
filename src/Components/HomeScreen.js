import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { styles } from '../constants/styles'

export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Roster" onPress={() => navigation.navigate('Roster')} />
      <Button title="Workout" onPress={() => navigation.navigate('Workout')} />
      <StatusBar style="auto" />
    </View>
  );
}
