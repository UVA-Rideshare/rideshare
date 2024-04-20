import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const HomepagePost = ({ title, body, author }) => {
    return (
        <View style={styles.postContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
            <Text style={styles.author}>{author}</Text>
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
    author: {
        color: '#007bff',
        marginBottom: 5,
    },
    body: {
        color: '#333',
    },
});

export default HomepagePost;
