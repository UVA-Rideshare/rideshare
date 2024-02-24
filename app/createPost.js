import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreatePost = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);


    const handleSubmit = () => {
        const post = { title, body, author };
        setIsPending(true);
        // Here you would typically send the data to your backend or local storage
        // For demonstration, we'll just log the post and pretend we're sending it
        console.log(post);
        // Simulate a network request with a delay
        setTimeout(() => {
            setIsPending(false);
            alert('Post added!'); // Show some feedback
            // Reset form (optional)
            setTitle('');
            setBody('');
            setAuthor('');
            // Navigate or update UI
        }, 2000); // Simulate a 2-second network request
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vent Out Here</Text>
            <TextInput
                style={styles.input}
                placeholder="Vent title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Vent body"
                multiline
                value={body}
                onChangeText={setBody}
            />
            <Text>Vent author:</Text>
            <Text>Pssst... you can make it anonymous...</Text>
            <TextInput
                style={styles.input}
                placeholder="Author"
                value={author}
                onChangeText={setAuthor}
            />
            {!isPending && <Button title="Add Vent" onPress={handleSubmit} />}
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
