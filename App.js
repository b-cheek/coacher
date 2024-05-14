import { useState } from 'react';
import { TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from './src/constants/styles';
import { Formula, FormulaHelpers } from './src/utils/vdotCalc';
import HomeScreen from './src/Components/HomeScreen';
import RosterScreen from './src/Components/RosterScreen';
import WorkoutScreen from './src/Components/WorkoutScreen';

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
