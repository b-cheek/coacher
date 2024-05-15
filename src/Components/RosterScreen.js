import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { styles } from '../constants/styles'
import { storeDataObject, storeDataString, getDataObject, getDataString } from '../store/store';
import AthleteForm from './AthleteForm';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RosterScreen() {
  const [showAthleteForm, setShowAthleteForm] = useState(false);
  const [athletes, setAthletes] = useState([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getDataObject('athletes');
      if (Array.isArray(res)) {
        setAthletes(res);
      }
      res = await getDataString('nextId');
      if (res) {
        setNextId(parseInt(res));
      }
    }

    fetchData();
  }, []); // empty dependency array means only run once when component mounts

  async function addAthlete(firstName, lastName) {
    const newAthletes = [...athletes, {
      id: nextId,
      firstName: firstName,
      lastName: lastName
    }];
    setAthletes(newAthletes);
    await storeDataObject('athletes', newAthletes);
    setNextId(nextId + 1);
    await storeDataString('nextId', (nextId + 1).toString());
    setShowAthleteForm(false);
  }

  return (
    <View style={styles.container}>
      <Text>nextId: {nextId}</Text>
      {athletes && athletes.map((athlete) => <Text key={athlete.id}>{athlete.firstName} {athlete.lastName}</Text>)}
      {!showAthleteForm && <Button title="Add Athlete" onPress={() => setShowAthleteForm(true)} />}
      {showAthleteForm && <AthleteForm athletes={athletes} onSubmit={addAthlete} />}
      <Button title="Clear Roster" onPress={() => storeDataObject('athletes', [])} />
      <Button title="Clear nextId" onPress={() => storeDataString('nextId', 0)} />
      <Button title="Clear All" onPress={() => AsyncStorage.clear()} />
      <StatusBar style="auto" />
    </View>
  );
}
