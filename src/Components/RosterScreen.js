import {
  View,
  Button,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { styles } from "../constants/styles";
import {
  storeDataObject,
  storeDataString,
  getDataObject,
  getDataString,
} from "../store/store";
import { timeStrToSeconds } from "../utils/time";
import { Formula } from "../utils/vdotCalc";
import AthleteForm from "./AthleteForm";
import AthleteItem from "./AthleteItem";

export default function RosterScreen() {
  const [showAthleteForm, setShowAthleteForm] = useState(false);
  const [athletes, setAthletes] = useState([]);
  const [nextId, setNextId] = useState(0); // This is used to individualize athletes AND prs, since both are stored in the same 'athletes' key in localStorage

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
        VDOT: -1, // So Workout can check if VDOT has been set
      },
    ];
    setAthletes(newAthletes);
    await storeDataObject("athletes", newAthletes);
    setNextId(nextId + 1);
    await storeDataString("nextId", (nextId + 1).toString());
    setShowAthleteForm(false);
  };

  const addPR = async (athleteId, distance, time) => {
    const newAthletes = athletes.map((a) => {
      if (a.id === athleteId) {
        return {
          // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#overriding_properties
          ...a,
          prs: [
            ...a.prs,
            {
              id: nextId,
              distance: distance,
              time: time,
              workoutBasis: false,
            },
          ],
        };
      }
      return a;
    });

    setAthletes(newAthletes);
    await storeDataObject("athletes", newAthletes);
    setNextId(nextId + 1);
    await storeDataString("nextId", (nextId + 1).toString());
  };

  const removeAthleteById = async (athleteId) => {
    const newAthletes = athletes.toSpliced(
      athletes.findIndex((a) => a.id === athleteId),
      1
    );
    setAthletes(newAthletes);
    await storeDataObject("athletes", newAthletes);
  };

  setVDOT = (athlete, pr) => {
    let time = timeStrToSeconds(pr.time);
    let distance = parseFloat(pr.distance);

    // Calculate VDOT
    const VDOT = Formula.getVDOT(distance, time);

    athlete.VDOT = VDOT;
    // update new workout basis (remove old one if it exists)
    prs = athlete.prs.map((p) => {
      if (p.id === pr.id) {
        return {
          ...p,
          workoutBasis: true,
        };
      }
      else if (p.workoutBasis === true) {
        return {
          ...p,
          workoutBasis: false,
        };
      }
      return p;
    });

    const newAthletes = athletes.map((a) => {
      if (a.id === athlete.id) {
        return {
          ...a,
          prs: prs,
          VDOT: athlete.VDOT,
        };
      }
      return a;
    });
    setAthletes(newAthletes);
    storeDataObject("athletes", newAthletes);
  };

  return (
    <View style={[styles.screen, styles.container]}>
      {/* Keeping below to demo settings styling for possibility of pressables in that area */}
      {/* <View style={styles.settings}>
        <Button title="Show PR's" onPress={() => console.log('Show PRs')} />
        <Button title="Edit Roster" onPress={() => console.log('Edit Roster')} />
      </View> */}
      {/* <Text>nextId: {nextId}</Text> */}
      {/* Debugging, but also maybe causing trouble with "Text strings must be rendered within a <Text> Component" error? */}
      {/* I think I had trouble calling the parameter anything other than item here
      Also note passing props, felt excessive but being verbose is ok to show dependencies I suppose */}
      {/* <Text>{JSON.stringify(athletes)}</Text> */}
      {/* Above for debugging athletes, prs, remove later */}
      <FlatList
        data={athletes.sort((a, b) => a.lastName.localeCompare(b.lastName))}
        renderItem={({ item }) => (
          <AthleteItem
            athlete={item}
            addPR={addPR}
            removeAthleteById={removeAthleteById}
            setVDOT={setVDOT}
          />
        )}
        numColumns={1}
        style={{flexGrow: 0}}
        keyExtractor={(athlete) => athlete.id}
      ></FlatList>
      {/* Note maybe adding more columns later for flexibility */}
      <View
        style={styles.container}
      >
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
        {/* <Button
          title="Clear Roster"
          onPress={() => storeDataObject("athletes", [])}
        />
        <Button
          title="Clear nextId"
          onPress={() => storeDataString("nextId", "0")}
        />
        <Button title="Clear All" onPress={() => AsyncStorage.clear()} /> */}
      </View>
    </View>
  );
}
