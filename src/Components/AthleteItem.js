import React, { useState } from "react";
import { Text, Pressable, FlatList, TextInput, Button } from "react-native";
import { styles } from "../constants/styles";

export default function AthleteItem({ athlete, setPrs, removeAthleteById }) {
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
            <Text>
              {item.distance.toString()}: {item.time.toString()}
            </Text>
          )}
        ></FlatList>
      ) : null}
      {expanded ? (
        <Pressable>
          {/* Having nested pressable like this prevents clicks inside it from toggling expanded state in parent pressable
                    Maybe I should abstract a PRForm? This is already short, idk if another tiny component is necessary. Also would require passing props again. */}
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
                setPrs(athlete.id, [
                  ...athlete.prs,
                  { distance: distance, time: time },
                ]);
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
