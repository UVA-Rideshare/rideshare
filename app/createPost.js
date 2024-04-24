import React, { useState } from 'react';

import { View, TextInput, TouchableOpacity, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

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

            Alert.alert("Lets get you that ride!", "Your post has been submitted.")
            navigation.navigate('Homepage');
        
        } catch (e){
            console.error("Error adding document: ", e);
            alert("There was an error submitting your post.")
        }
        setIsPending(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Post a ride here!</Text>
            <TextInput
                style={styles.input}
                placeholder="Post title"
                value={title}
                onChangeText={setTitle}
                maxLength={40}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Post Details"
                multiline
                value={body}
                onChangeText={setBody}
                maxLength={300}
            />
            <TextInput
                style={styles.input}
                placeholder="Location of Rideshare"
                multiline
                value={location}
                onChangeText={setLocation}
                maxLength={100}
            />
            {!isPending && <Button title="Add ride" onPress={handleSubmit} />}
            {isPending && <ActivityIndicator size="large" />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    }
});

export default CreatePost;
