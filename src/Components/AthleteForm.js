import React, { useState } from "react";
import { TextInput, Button, View, Platform } from "react-native";
import { styles } from "../constants/styles";

export default function AthleteForm({ onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <View
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TextInput
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
      />
      <Button title="Submit" onPress={() => onSubmit(firstName, lastName)} />
    </View>
  );
}
