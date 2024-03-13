import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleButtonClick = () => {
    // Perform some processing on the input text
    const processedText = processInputText(inputText);

    // Update the output text
    setOutputText(processedText);
  };

  return (
    <View style={styles.container}>
      <Text>Open up Apps.js to start working on your app!</Text>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={handleInputChange}
      />
      <Button title="Calculate VDOT" onPress={handleButtonClick} />
      <Text>{outputText}</Text>
      <StatusBar style="auto" />
    </View>
  );
}


const processInputText = (inputText) => {
  // time = inputText.split(":").slice().reverse().reduce((acc, time, index) => {
  //   return acc + time * Math.pow(60, index);
  // });
  let time = inputText.split(":").reverse().reduce((acc, time, index) => {
    return parseFloat(acc) + time * Math.pow(60, index);
  });

  return time;
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
