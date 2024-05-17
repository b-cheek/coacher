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
import * as Print from "expo-print";
import { shareAsync } from 'expo-sharing';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  storeDataObject,
  storeDataString,
  getDataObject,
  getDataString,
} from "../store/store";
import { styles } from "../constants/styles";
import WorkoutForm from "./WorkoutForm";
import WorkoutItem from "./WorkoutItem";

export default function WorkoutScreen() {
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [nextId, setNextId] = useState(0);
  // const [selectedPrinter, setSelectedPrinter] = useState();

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

  // See https://docs.expo.dev/versions/latest/sdk/print/#usage

  // const print = async () => {
  //   // On iOS/android prints the given html. On web prints the HTML from the current page.
  //   await Print.printAsync({
  //     html,
  //     printerUrl: selectedPrinter?.url, // iOS only
  //   });
  // };

  const printToFile = async (html) => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  // const selectPrinter = async () => {
  //   const printer = await Print.selectPrinterAsync(); // iOS only
  //   setSelectedPrinter(printer);
  // };

  const getTimeSheet = async (workout) => {
    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <body style="text-align: center;">
          <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
            Hello Expo!
          </h1>
          <img
            src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
            style="width: 90vw;" />
        </body>
      </html>
    `;

    printToFile(html);
    // Note that this prints appropriately on ios/Android, but prints page html on web.
    // See workarounds at https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Printing#examples
  };

  removeWorkoutById = async (workoutId) => {
    const newWorkouts = workouts.filter((workout) => workout.id !== workoutId);
    setWorkouts(newWorkouts);
    await storeDataObject("workouts", newWorkouts);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Workout Screen</Text>
      <Text>{JSON.stringify(workouts)}</Text>
      {/* Above for debugging workouts remove later */}
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <WorkoutItem
            workout={item}
            getTimeSheet={getTimeSheet}
            removeWorkoutById={removeWorkoutById}
          />
        )}
        numColumns={1}
        keyExtractor={(workout) => workout.id}
      ></FlatList>
      {/* Note maybe adding more columns later for flexibility */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={useHeaderHeight()}
      >
        {/* keyBoardVerticalOffset is necessary for this to work at all with the status bar */}
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
        <Button
          title="Clear Workouts"
          onPress={() => storeDataObject("workouts", [])}
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
