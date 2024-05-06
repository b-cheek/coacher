import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formula, FormulaHelpers } from './src/vdotCalc';

export default function App() {
  const [inputTextAthlete, setInputTextAthlete] = useState('');
  const [inputTextTime, setInputTextTime] = useState('');
  const [inputTextDistance, setInputTextDistance] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleAthleteChange = (text) => {
    setInputTextAthlete(text);
  }

  const handleTimeChange = (text) => {
    setInputTextTime(text);
  };
  
  const handleDistanceChange = (text) => {
    setInputTextDistance(text);
  };

  const handleButtonClick = () => {
    // Calculate VDOT
    const VDOT = processInputText(inputTextAthlete, inputTextTime, inputTextDistance);

    // Update the output text
    setOutputText(VDOT);
  };

  return (
    <View style={styles.container}>
      <Text>Athlete:</Text>
      <TextInput
        style={styles.input}
        value={inputTextAthlete}
        onChangeText={handleAthleteChange}
      />
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
      <VDOTList />
      <StatusBar style="auto" />
    </View>
  );
}


const processInputText = (inputTextAthlete, inputTextTime, inputTextDistance) => {
  let time = inputTextTime.split(":").reverse().reduce((acc, time, index) => {
    return parseFloat(acc) + time * Math.pow(60, index-1);
  }, 0); // Initial value of 0 so callback is called on each element of the array
  let distance = parseFloat(inputTextDistance);

  // Calculate VDOT
  const VDOT = Formula.getVDOT(distance, time);

  // Store the VDOT in AsyncStorage with Athlete name
  storeData(inputTextAthlete, VDOT);

  return VDOT;
};

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

// Component to display all the VDOT values stored in AsyncStorage
const VDOTList = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      setData(values);
    } catch(e) {
      // error reading value
    }
  };

  return (
    <View>
      <Button title="Get VDOTs" onPress={getData} />
      {data.map(value => <Text>{value[0] + ": " + value[1]}</Text>)}
    </View>
  );
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
