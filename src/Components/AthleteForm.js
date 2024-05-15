import React, { useState } from 'react';
import { TextInput, Button } from 'react-native';

export default function AthleteForm({ athletes, onSubmit }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <>
            <TextInput placeholder="First Name" onChangeText={text => setFirstName(text)} />
            <TextInput placeholder="Last Name" onChangeText={text => setLastName(text)} />
            <Button title="Submit" onPress={() => onSubmit(firstName, lastName)} />
        </>
    )
}