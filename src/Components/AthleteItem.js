import React, { useState } from 'react';
import { Text, Pressable, FlatList, TextInput, Button } from 'react-native';
import { styles } from '../constants/styles';
import { storeDataObject } from '../store/store';

export default AthleteItem = ({ athlete, setPrs, removeAthleteById }) => {
    const [expanded, setExpanded] = useState(false);
    const [showPRForm, setShowPRForm] = useState(false);
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState('');

    return (
        <Pressable onPress={() => setExpanded(!expanded)} style={styles.listItemContainer}>
            <Text>expanded: {expanded.toString()}</Text>
            <Text numberOfLines={1} style={styles.listItemText}>{athlete.firstName} {athlete.lastName}</Text>
            {expanded && athlete.prs.length > 0 && <Text>PRs:</Text>}
            {expanded &&
                <FlatList
                    data={athlete.prs}
                    renderItem={({ item }) =>
                        <Text>{item.distance.toString()}: {item.time.toString()}</Text>}>
                </FlatList>
            }
            {expanded &&
                <Pressable>
                    {!showPRForm && <Button title="Add PR" onPress={() => setShowPRForm(true)} />}
                    {showPRForm && <TextInput placeholder="Distance (meters)" onChangeText={text => setDistance(text)} />}
                    {showPRForm && <TextInput placeholder="Time" onChangeText={text => setTime(text)} />}
                    {showPRForm && <Button title="Submit" onPress={() => {
                        setPrs(athlete.id, [...athlete.prs, {distance: distance, time: time}]);
                        setShowPRForm(false);
                        }
                     }/>}
                    <Button title="Delete" onPress={() => removeAthleteById(athlete.id)} />
                </Pressable>
            }
            {/* {expanded && !showPRForm && <Button title="Add PR" onPress={() => setShowPRForm(true)} />}
        {showPRForm && <TextInput placeholder="Distance (meters)" onChangeText={text => setDistance(text)}/>}
        {showPRForm && <TextInput placeholder="Time" onChangeText={text => setTime(text)}/>}
        {showPRForm && <Button title="Submit" onPress={addPR} />}
        {expanded && <Button title="Delete" onPress={removeAthleteById} />} */}
        </Pressable>
    )
}