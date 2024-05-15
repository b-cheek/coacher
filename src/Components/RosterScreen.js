import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { styles } from '../constants/styles'
import { storeDataObject, storeDataString, getDataObject, getDataString } from '../store/store';
import { useState } from 'react';
import AthleteForm from './AthleteForm';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RosterScreen() {
  const [showAthleteForm, setShowAthleteForm] = useState(false);
  const [athletes, setAthletes] = useState(Array.isArray(getDataObject('athletes')) ? getDataObject('athletes') : []);
  // const [athletes, setAthletes] = useState(getDataObject('athletes') || []);
  const [nextId, setNextId] = useState(parseInt(getDataString('nextId')) || 0);
  // const [nextId, setNextId] = useState(getDataString('nextId')) ? );

  function addAthlete(firstName, lastName) {
      setAthletes([...athletes, {
          id: nextId,
          firstName: firstName,
          lastName: lastName
      }]);
      storeDataObject('athletes', athletes);
      setNextId(nextId + 1);
      storeDataString('nextId', (nextId + 1).toString());
      setShowAthleteForm(false);
  }

  return (
    <View style={styles.container}>
      <Text>nextId: {nextId}</Text>
      {athletes && athletes.map((athlete) => <Text key={athlete.id}>{athlete.firstName} {athlete.lastName}</Text>)}
      {!showAthleteForm && <Button title="Add Athlete" onPress={() => setShowAthleteForm(true)} />}
      {showAthleteForm && <AthleteForm athletes={athletes} onSubmit={addAthlete}/>}
      <Button title="Clear Roster" onPress={() => storeDataObject('athletes', [])} />
      <Button title="Clear nextId" onPress={() => storeDataString('nextId', 0)} />
      <Button title="Clear All" onPress={() => AsyncStorage.clear()} />
      <StatusBar style="auto" />
    </View>
  );
}
