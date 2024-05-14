import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Formula, FormulaHelpers } from './vdotCalc';

function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Roster" onPress={() => navigation.navigate('Roster')} />
      <Button title="Workout" onPress={() => navigation.navigate('Workout')} />
      <StatusBar style="auto" />
    </View>
  );
}

function RosterScreen() {

  return (
    <View style={styles.container}>
      <Text>Roster Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function WorkoutScreen() {
  
  return (
    <View style={styles.container}>
      <Text>Workout Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Roster" component={RosterScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
