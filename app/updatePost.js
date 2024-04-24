import React, { useState, useEffect } from 'react';

import { View, TextInput, TouchableOpacity, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

//Firebase imports
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

import { db, auth } from "../firebaseconfig"

const UpdatePost = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const author = auth.currentUser;
    if (!author) {
        return null;
    }
    const [isPending, setIsPending] = useState(false);

    const postID = route.params.postID;
    const oldTitle = route.params.oldTitle;
    const oldBody = route.params.oldBody;

    useEffect(() => {
        setTitle(oldTitle);
        setBody(oldBody);
    }, [])
    


    const handleSubmit = async () => {
        setIsPending(true);
        const post = { title, body, author };

        try{
            const docRef = doc(db, "posts", postID)
            
            await updateDoc(docRef, {
                "title": title, 
                "body": body
            })

            Alert.alert("Success!", "Your post has been updated.")
            navigation.navigate('Homepage');
        
        } catch (e){
            console.error("Error adding document: ", e);
            alert("There was an error submitting your post.")
        }
        setIsPending(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Post</Text>
            <TextInput
                style={styles.input}
                placeholder="Updated title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Updated details"
                multiline
                value={body}
                onChangeText={setBody}
            />
            {!isPending && <Button title="Update" onPress={handleSubmit} />}
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

export default UpdatePost;
