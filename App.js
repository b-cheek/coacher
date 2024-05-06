import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Formula, FormulaHelpers } from './vdotCalc';

export default function App() {
  const [inputTextTime, setInputTextTime] = useState('');
  const [inputTextDistance, setInputTextDistance] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleTimeChange = (text) => {
    setInputTextTime(text);
  };
  
  const handleDistanceChange = (text) => {
    setInputTextDistance(text);
  };

  const handleButtonClick = () => {
    // Calculate VDOT
    const VDOT = processInputText(inputTextTime, inputTextDistance);

    // Update the output text
    setOutputText(VDOT);
  };

  return (
    <View style={styles.container}>
      <Text>Time:</Text>
      <TextInput
        style={styles.input}
        value={inputTextTime}
        onChangeText={handleTimeChange}
      />
      <Text>Distance (meters):</Text>
      <TextInput
        style={styles.input}
        value={inputTextDistance}
        onChangeText={handleDistanceChange}
      />
      <Button title="Calculate VDOT" onPress={handleButtonClick} />
      <Text>{outputText}</Text>
      <StatusBar style="auto" />
    </View>
  );
}


const processInputText = (inputTextTime, inputTextDistance) => {
  let time = inputTextTime.split(":").reverse().reduce((acc, time, index) => {
    return parseFloat(acc) + time * Math.pow(60, index-1);
  }, 0); // Initial value of 0 so callback is called on each element of the array
  let distance = parseFloat(inputTextDistance);

  // Calculate VDOT
  const VDOT = Formula.getVDOT(distance, time);

  return VDOT;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
