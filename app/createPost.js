import React, { useState } from 'react';

import { View, TextInput, TouchableOpacity, Text, StyleSheet, Button, ActivityIndicator, Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

//Firebase imports
import { collection, addDoc } from "firebase/firestore";

import { db, auth } from "../firebaseconfig"

const CreatePost = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [location, setLocation] = useState('');
    const author = auth.currentUser;
    if (!author) {
        return null;
    }
    const [isPending, setIsPending] = useState(false);


    const handleSubmit = async () => {
        // cheks if title or body is empty
        if (title.trim() === '' || body.trim() === '') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert("Missing Information", "Please enter both a title and details for the ride.");
            return; 
        }
        setIsPending(true);

        const post = { title, body, author };

        try{
            const docRef = await addDoc(collection(db, "posts"),{
                title: title,
                body: body,
                author: author.email, 
                location: location, 
                comments: [],
            });
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            Alert.alert("Lets get you that ride!", "Your post has been submitted.")
            navigation.navigate('Homepage');
        
        } catch (e){
            console.error("Error adding document: ", e);
            alert("There was an error submitting your post.")
        }
        setIsPending(false);
    };

    return (
        <TouchableWithoutFeedback style={styles.feedback} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Post a ride here!</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Post title"
                    value={title}
                    onChangeText={setTitle}
                    onFocus={() => Haptics.selectionAsync()}
                    maxLength={40}
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Post Details"
                    multiline
                    value={body}
                    onChangeText={setBody}
                    onFocus={() => Haptics.selectionAsync()}
                    maxLength={300}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Location of Rideshare"
                    multiline
                    value={location}
                    onChangeText={setLocation}
                    onFocus={() => Haptics.selectionAsync()}
                    maxLength={100}
                />
                {!isPending && <TouchableOpacity style={styles.updateButton} onPress={handleSubmit} >
                    <Text style={styles.buttonText}>Add Ride</Text>
                </TouchableOpacity>}
                {isPending && <ActivityIndicator size="large" />}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    textArea: {
        height: 100,
        justifyContent: "flex-start"
    },
    updateButton: {
        backgroundColor: '#19C3EF', // Vibrant green
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CreatePost;
