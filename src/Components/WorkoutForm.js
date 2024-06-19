import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

export default function WorkoutForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [workout, setWorkout] = useState("");

  return (
    <View>
      <TextInput
        placeholder="Title (optional)"
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Workout (ex. 2E 4x200I 1x1600T 4x200R 2E)"
        onChangeText={(text) => setWorkout(text)}
      />
      <Button
        title="Submit"
        onPress={() => onSubmit(title || workout, workout)}
      />
    </View>
  );
}