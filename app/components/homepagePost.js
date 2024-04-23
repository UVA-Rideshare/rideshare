import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { db } from '../../firebaseconfig';
import { doc, collection, deleteDoc, updateDoc} from 'firebase/firestore';
import { set } from 'firebase/database';
import { Divider } from '@gluestack-ui/themed';

const HomepagePost = ({postID, title, body, author, isPostAuthor, onPostDeleted, navigation}) => {

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
        navigation.navigate('UpdatePost', {postID: postID, oldTitle: title, oldBody: body});
        
    }
    return (
        <View style={styles.postContainer}>

            <Text style={styles.title}>{title}</Text>
            
            <View style={styles.objectContainer}>
            <Text style={styles.author}>Author: {author}</Text>
            </View>

            <View style={styles.postContainer}>
            <Text style={styles.body}>{body}</Text>
            </View>

            {isPostAuthor && 
            (
            <View style={styles.buttonContainer}>
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
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 0, 
    },
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
    objectContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
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
        marginRight: 10,
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
