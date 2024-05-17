import React, { useState } from "react";
import { Text, Button, Pressable } from "react-native";
import { styles } from "../constants/styles";

export default function WorkoutItem({ workout, removeWorkoutById }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      style={styles.listItemContainer}
    >
      <Text>{(workout.title) ? workout.title + `(${workout.workout})` : workout.workout}</Text>
      {expanded ? (
        <Button
          title="Get Time Sheet"
          onPress={() => console.log("Get Time Sheet")}
        />
      ) : null}
      {expanded ? (
        <Button title="Remove" onPress={() => removeWorkoutById(workout.id)} />
      ) : null}
    </Pressable>
  );
}
