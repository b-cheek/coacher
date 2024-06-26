import React, {useState} from 'react';
import {Text, Button, Pressable, PlatformColor} from 'react-native';
import {styles} from '../constants/styles';

export default function WorkoutItem({
  workout,
  getTimeSheet,
  removeWorkoutById,
  showSuccess,
  showError,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      style={styles.listItemContainer}>
      <Text>
        {workout.title}
      </Text>
      {expanded
        ? [
            <Button
              title="Get Time Sheet"
              onPress={() => getTimeSheet(workout)}
            />,
            <>{showSuccess ? <Text style={{color: PlatformColor('SystemFillColorSuccessBrush')}}>Saved in Downloads folder</Text> 
            : showError ? <Text style={{color: '#ff0000'}}>Error saving file; see debug console</Text>
            : null}</>,
            <Button
              title="Remove"
              onPress={() => removeWorkoutById(workout.id)}
            />,
          ]
        : null}
    </Pressable>
  );
}
