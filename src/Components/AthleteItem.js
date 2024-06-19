import React, { useState } from "react";
import { Text, Pressable, FlatList, TextInput, Button } from "react-native";
import { styles } from "../constants/styles";

export default function AthleteItem({ athlete, addPR, removeAthleteById, setVDOT}) {
  const [expanded, setExpanded] = useState(false);
  const [showPRForm, setShowPRForm] = useState(false);
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      style={styles.listItemContainer}
    >
      <Text numberOfLines={1} style={styles.listItemText}>
        {athlete.firstName} {athlete.lastName}
      </Text>
      {expanded && athlete.prs > 0 ? <Text>PRs:</Text> : null}
      {expanded ? (
        <FlatList
          data={athlete.prs}
          renderItem={({ item }) => (
            <Pressable onPress={() => setVDOT(athlete, item)}>
              <Text style={item.workoutBasis && {fontWeight: 'bold'}}>
                {item.distance.toString()}: {item.time.toString()}
              </Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        ></FlatList>
      ) : null}
      {expanded ? (
        <Pressable>
          {/* Having nested pressable like this prevents clicks inside it from toggling expanded state in parent pressable
<<<<<<< HEAD
                    Maybe I should abstract a PRForm? This is already short, idk if another tiny component is necessary. Also would require passing props again. */}
=======
          Maybe I should abstract a PRForm? This is already short, idk if another tiny component is necessary. Also would require passing props again. */}
>>>>>>> coacher-webview
          {!showPRForm ? (
            <Button title="Add PR" onPress={() => setShowPRForm(true)} />
          ) : null}
          {showPRForm ? (
            <TextInput
              placeholder="Distance (meters)"
              onChangeText={(text) => setDistance(text)}
            />
          ) : null}
          {showPRForm ? (
            <TextInput
              placeholder="Time"
              onChangeText={(text) => setTime(text)}
            />
          ) : null}
          {showPRForm ? (
            <Button
              title="Submit"
              onPress={() => {
                addPR(athlete.id, distance, time);
                setShowPRForm(false);
              }}
            />
          ) : null}
          <Button
            title="Delete"
            onPress={() => removeAthleteById(athlete.id)}
          />
        </Pressable>
      ) : null}
    </Pressable>
  );
}
