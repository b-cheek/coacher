import {
  Text,
  View,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import * as RNFS from '@dr.pogodin/react-native-fs';
import {
  storeDataObject,
  storeDataString,
  getDataObject,
  getDataString,
} from "../store/store";
import getTimeSheetHtml from "../utils/timeSheetHtml";
import { styles } from "../constants/styles";
import WorkoutForm from "./WorkoutForm";
import WorkoutItem from "./WorkoutItem";

export default function WorkoutScreen() {
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getDataObject("workouts");
      if (Array.isArray(res)) {
        setWorkouts(res);
      }
      res = await getDataString("nextId");
      if (res) {
        setNextId(parseInt(res));
      }
    };

    fetchData();
  }, []); // empty dependency array means only run once when component mounts

  addWorkout = async (title, workout) => {
    const newWorkouts = [
      ...workouts,
      {
        id: nextId,
        title: title,
        workout: workout,
      },
    ];
    setWorkouts(newWorkouts);
    await storeDataObject("workouts", newWorkouts);
    setNextId(nextId + 1);
    await storeDataString("nextId", (nextId + 1).toString());
    setShowWorkoutForm(false);
  };

  const getTimeSheet = async (workout) => {
    const athletes = await getDataObject("athletes");

    const html = getTimeSheetHtml(workout, athletes);

    var path = RNFS.DownloadDirectoryPath + `\\${workout.title}.html`
    // write the file
    // console.log(path)
    RNFS.writeFile(path, html, 'utf8')
      .then((success) => {
        setShowSuccess(true);
        console.debug(success);
        setTimeout(() => setShowSuccess(false), 3000);
      })
      .catch((err) => {
        setShowError(true);
        console.debug(err)
        setTimeout(() => setShowError(false), 3000);
      });
  };

  removeWorkoutById = async (workoutId) => {
    const newWorkouts = workouts.filter((workout) => workout.id !== workoutId);
    setWorkouts(newWorkouts);
    await storeDataObject("workouts", newWorkouts);
  };

  return (
    <View style={styles.container}>
      <Text>Workout Screen</Text>
      {/* <Text>{JSON.stringify(workouts)}</Text> */}{/* Debugging workouts remove later */}
      {/* Above for debugging workouts remove later */}
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <WorkoutItem
            workout={item}
            getTimeSheet={getTimeSheet}
            removeWorkoutById={removeWorkoutById}
            showSuccess={showSuccess}
            showError={showError}
          />
        )}
        numColumns={1}
        keyExtractor={(workout) => workout.id}
      ></FlatList>
      {/* Note maybe adding more columns later for flexibility */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {!showWorkoutForm ? (
          <Button
            title="Add Workout"
            onPress={() => setShowWorkoutForm(true)}
          />
        ) : null}
        {showWorkoutForm ? (
          <WorkoutForm workouts={workouts} onSubmit={addWorkout} />
        ) : null}
        {/* Debug buttons below */}
        {/* <Button
          title="Clear Workouts"
          onPress={() => storeDataObject("workouts", [])}
        />
        <Button
          title="Clear nextId"
          onPress={() => storeDataString("nextId", "0")}
        />
        <Button title="Clear All" onPress={() => AsyncStorage.clear()} /> */}
      </KeyboardAvoidingView>
    </View>
  );
}
