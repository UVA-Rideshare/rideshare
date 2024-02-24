import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomepagePost from './components/homepagePost.js'
import CreatePost from './createPost.js';
import BottomNavBar from './components/navbar.js';

const samplePostDB = [
    {
        title: "Heading to NOVA 2/14",
        contact: "703-420-6969",
        description: "Heading to NOVA on valentines day, would like $20Heading to NOVA on valentines day, would like $20Heading to NOVA on valentines day, would like $20Heading to NOVA on valentines day, would like $20Heading to NOVA on valentines day, would like $20Heading to NOVA on valentines day, would like $20Heading to NOVA on valentines day, would like $20Heading to NOVA on valentines day, would like $20Heading to NOVA on valentines day, would like $20Heading to NOVA on valentines day, would like $20Heading to NOVA on valentines day, would like $20"
    }, 
    {
        title: "Going to Richmond",
        contact: "arthur.gmail.com",
        description: "Going to interview"
    }, 
    {
        title: "Going to Norfolk",
        contact: "brahsucxk@aol.com",
        description: "Heading off to Norfolk :)"
    }, 
]

const Homepage = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            {samplePostDB.map((post, index) => (
                <HomepagePost 
                    key={index}
                    title={post.title}
                    contact={post.contact}
                    description={post.description} 
                />
            ))}
            <BottomNavBar
                navigation={navigation}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, // Ensure SafeAreaView fills the screen
        justifyContent: 'space-between' // Pushes children to the ends of the container
    },
    container: {
        flex: 1 // Take up all available space
    },
});

export default Homepage;