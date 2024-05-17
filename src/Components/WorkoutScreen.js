import { StatusBar } from "expo-status-bar";
import { Text, View, Button, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeDataObject, storeDataString, getDataObject, getDataString } from "../store/store";
import { styles } from "../constants/styles";
import WorkoutForm from "./WorkoutForm";
import WorkoutItem from "./WorkoutItem";

export default function WorkoutScreen() {
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [nextId, setNextId] = useState(0);

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

  removeWorkoutById = async (workoutId) => {
    const newWorkouts = workouts.filter((workout) => workout.id !== workoutId);
    setWorkouts(newWorkouts);
    await storeDataObject("workouts", newWorkouts);
  }

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
