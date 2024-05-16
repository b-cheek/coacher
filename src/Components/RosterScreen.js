import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useState, useEffect } from "react";
import { styles } from "../constants/styles";
import {
  storeDataObject,
  storeDataString,
  getDataObject,
  getDataString,
} from "../store/store";
import AthleteForm from "./AthleteForm";
import AthleteItem from "./AthleteItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RosterScreen() {
  const [showAthleteForm, setShowAthleteForm] = useState(false);
  const [athletes, setAthletes] = useState([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getDataObject("athletes");
      if (Array.isArray(res)) {
        // Type safety so athletes will always be an array
        setAthletes(res);
      }
      res = await getDataString("nextId");
      if (res) {
        setNextId(parseInt(res));
      }
    };

    fetchData();
  }, []); // empty dependency array means only run once when component mounts

  const addAthlete = async (firstName, lastName) => {
    const newAthletes = [
      ...athletes,
      {
        id: nextId,
        firstName: firstName,
        lastName: lastName,
        prs: [], // Initialize as empty array so it can be accessed for adding prs later
      },
    ];
    setAthletes(newAthletes);
    await storeDataObject("athletes", newAthletes);
    setNextId(nextId + 1);
    await storeDataString("nextId", (nextId + 1).toString());
    setShowAthleteForm(false);
  };

  const setPrs = async (athleteId, prs) => {
    const newAthletes = athletes.map((a) => {
      if (a.id === athleteId) {
        return {
          // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#overriding_properties
          ...a,
          prs: prs,
        };
      }
      return a;
    });
    setAthletes(newAthletes);
    await storeDataObject("athletes", newAthletes);
  };

  const removeAthleteById = async (athleteId) => {
    const newAthletes = athletes.toSpliced(
      athletes.findIndex((a) => a.id === athleteId),
      1
    );
    setAthletes(newAthletes);
    await storeDataObject("athletes", newAthletes);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* Keeping below to demo settings styling for possibility of pressables in that area */}
      {/* <View style={styles.settings}>
        <Button title="Show PR's" onPress={() => console.log('Show PRs')} />
        <Button title="Edit Roster" onPress={() => console.log('Edit Roster')} />
      </View> */}
      {/* <Text>nextId: {nextId}</Text> */}{/* Debugging, but also maybe causing trouble with "Text strings must be rendered within a <Text> Component" error? */}
      {/* I think I had trouble calling the parameter anything other than item here
      Also note passing props, felt excessive but being verbose is ok to show dependencies I suppose */}
      <FlatList
        data={athletes}
        renderItem={({ item }) => (
          <AthleteItem
            athlete={item}
            setPrs={setPrs}
            removeAthleteById={removeAthleteById}
          />
        )}
        numColumns={1}
        keyExtractor={(athlete) => athlete.id}
      ></FlatList>
      {/* Note maybe adding more columns later for flexibility */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={useHeaderHeight()}
      >
        {/* keyBoardVerticalOffset is necessary for this to work at all with the status bar */}
        {!showAthleteForm ? (
          <Button
            title="Add Athlete"
            onPress={() => setShowAthleteForm(true)}
          />
        ) : null}
        {showAthleteForm ? (
          <AthleteForm athletes={athletes} onSubmit={addAthlete} />
        ) : null}
        {/* Debug buttons below */}
        <Button
          title="Clear Roster"
          onPress={() => storeDataObject("athletes", [])}
        />
        <Button
          title="Clear nextId"
          onPress={() => storeDataString("nextId", "0")}
        />
        <Button title="Clear All" onPress={() => AsyncStorage.clear()} />
      </KeyboardAvoidingView>
    </View>
  );
}
