<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
=======
>>>>>>> coacher-webview
import {
  Text,
  View,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
<<<<<<< HEAD
import { useHeaderHeight } from "@react-navigation/elements";
import { useState, useEffect } from "react";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";
=======
import { useState, useEffect } from "react";
import * as RNFS from '@dr.pogodin/react-native-fs';
>>>>>>> coacher-webview
import {
  storeDataObject,
  storeDataString,
  getDataObject,
  getDataString,
} from "../store/store";
<<<<<<< HEAD
import { Formula } from "../utils/vdotCalc";
import { secondsToTimeStr } from "../utils/time";
=======
import getTimeSheetHtml from "../utils/timeSheetHtml";
>>>>>>> coacher-webview
import { styles } from "../constants/styles";
import WorkoutForm from "./WorkoutForm";
import WorkoutItem from "./WorkoutItem";

export default function WorkoutScreen() {
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [nextId, setNextId] = useState(0);
<<<<<<< HEAD
  // const [selectedPrinter, setSelectedPrinter] = useState();
=======
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
>>>>>>> coacher-webview

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

<<<<<<< HEAD
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
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  // const selectPrinter = async () => {
  //   const printer = await Print.selectPrinterAsync(); // iOS only
  //   setSelectedPrinter(printer);
  // };

  const getTimeSheet = async (workout) => {
    const athletes = await getDataObject("athletes");
    const totalTimes = workout.workout.split(" ").reduce((acc, block) => {
      return acc + parseInt(block.split("x")[0]);
    }, 0);

    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <body>
        <h1 style:"width: 100%; text-align: center;">${
          workout.title
            ? workout.title + ` (${workout.workout})`
            : workout.workout
        }</h1>
        <div
          style="display: flex; 
          justify-content: center;
          align-items: center;
          flex-direction: column;"
        >
          <h3>Target Times</h3>
            <table style="border-spacing: 5px;">
              <thead>
                <tr>
                  <th>Athlete</th>
                  ${workout.workout
                    .split(" ")
                    .map((block) => {
                      return `<th>${block.split("x")[1]}</th>`;
                    })
                    .join("")}
                </tr>
              </thead>
              <tbody>
                ${athletes
                  .map((athlete) => {
                    let VDOT = parseFloat(athlete.VDOT);
                    return `<tr>
                      <td>${athlete.firstName} ${athlete.lastName}</td>
                      ${workout.workout
                        .split(" ")
                        .map((block) => {
                          let intensity = block.charAt(block.length - 1);
                          let res = "Failed";
                          let distance = block.split("x")[1].slice(0, -1);
                          switch (intensity) {
                            // boilderplate for intensity values E, M, T, I, R
                            case "E":
                              res = Formula.getEasyPace(VDOT, distance);
                              break;
                            case "M":
                              res = Formula.getMarathonPace(VDOT, distance);
                              break;
                            case "T":
                              res = Formula.getThresholdPace(VDOT, distance);
                              break;
                            case "I":
                              res = Formula.getIntervalPace(VDOT, distance);
                              break;
                            case "R":
                              res = Formula.getRepetitionPace(VDOT, distance);
                              break;
                          }
                          return `<td>${secondsToTimeStr(res * 60)}</td>`;
                        })
                        .join("")}
                    </tr>`;
                  })
                  .join("")}
              </tbody>
            </table>
            <h3>Log</h3>
            <table>
              <thead>
                <tr>
                  <th>Athlete</th>
                  ${workout.workout
                    .split(" ")
                    .map((block) => {
                      return `${Array(parseInt(block.split("x")[0]))
                        .fill(`<th>${block.split("x")[1]}</th>`)
                        .join("")}`;
                    })
                    .join("")}
                </tr>
              </thead>
              <tbody>
                ${athletes
                  .map((athlete) => {
                    let VDOT = parseFloat(athlete.VDOT);
                    return `
                      <tr>
                        <td>${athlete.firstName} ${athlete.lastName}</td>
                        ${Array(totalTimes).fill("<td>_____</td>").join("")}
                      </tr>
                    `;
                  })
                  .join("")}
              </tbody>
            </table>
            <h3>Groups</h3>
          </div>
        </body>
      </html>
    `;

    console.debug(html);

    printToFile(html);
    // Note that this prints appropriately on ios/Android, but prints page html on web.
    // See workarounds at https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Printing#examples
=======
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
>>>>>>> coacher-webview
  };

  removeWorkoutById = async (workoutId) => {
    const newWorkouts = workouts.filter((workout) => workout.id !== workoutId);
    setWorkouts(newWorkouts);
    await storeDataObject("workouts", newWorkouts);
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <StatusBar style="auto" />
=======
>>>>>>> coacher-webview
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
<<<<<<< HEAD
=======
            showSuccess={showSuccess}
            showError={showError}
>>>>>>> coacher-webview
          />
        )}
        numColumns={1}
        keyExtractor={(workout) => workout.id}
      ></FlatList>
      {/* Note maybe adding more columns later for flexibility */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
<<<<<<< HEAD
        keyboardVerticalOffset={useHeaderHeight()}
      >
        {/* keyBoardVerticalOffset is necessary for this to work at all with the status bar */}
=======
      >
>>>>>>> coacher-webview
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
