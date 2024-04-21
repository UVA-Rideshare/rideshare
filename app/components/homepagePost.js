import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { db } from '../../firebaseconfig';
import { doc, collection, deleteDoc, updateDoc} from 'firebase/firestore';
import { set } from 'firebase/database';

const HomepagePost = ({postID, title, body, author, isPostAuthor, onPostDeleted}) => {

    const handleDelete = () => {
        Alert.alert(
            "Confirm Delete", 
            "Are you sure that you want to delete your post?", 
            [ 
                {
                    text: "Delete", 
                    onPress: async () => {
                        await deleteDoc(doc(db, 'posts', postID)); 
                        onPostDeleted(postID);   
                        
                    }, 
                    style: "cancel",
                }, 
                {
                    text: "Cancel", 
                }
            ]
        )
    }

    const handleUpdate = async () => {
        
        const [userInput, setUserInput] = useState('');

        Alert.prompt(
            'Update your post here!',
            'Change the body of your ride details below!',

            text => setUserInput(text),
            'plain-text'
        )

        const updatedPost = await updateDoc(doc, "posts", {
            body: userInput
        })
        
    }
    return (
        <View style={styles.postContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
            <Text style={styles.author}>{author}</Text>

            {isPostAuthor && 
            (
            <View>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            </View>
            )
            }
            
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    contact: {
        color: '#007bff',
        marginBottom: 5,
    },
    description: {
        color: '#333',
    },
    button: {
        backgroundColor: 'red', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5, 
        marginTop: 20,
      },
    updateButton: {
        backgroundColor: 'green', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5, 
        marginTop: 20,
    }, 
      buttonText: {
        color: 'white',
        fontSize: 16, 
        fontWeight: 'bold', 
        textAlign: 'center',
      }
});

export default HomepagePost;
