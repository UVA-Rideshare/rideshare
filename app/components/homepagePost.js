import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const HomepagePost = ({ title, contact, description }) => {
    return (
        <View style={styles.postContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.contact}>{contact}</Text>
            <Text style={styles.description}>{description}</Text>
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
});

export default HomepagePost;
