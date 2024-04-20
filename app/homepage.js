import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomepagePost from './components/homepagePost.js'
import CreatePost from './createPost.js';
import BottomNavBar from './components/navbar.js';

import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebaseconfig"


const Homepage = ({ navigation }) => {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const handleGetPosts = async () => {
            const data = await getDocs(collection(db, "posts"));
            setPosts(data);
            data.forEach((doc) => {console.log(`DOc data: ${doc.data().title}`)})
        }

        handleGetPosts();

    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            {posts && posts.forEach((post) => {
                <Text>{post.data().title}</Text>
            }
            )}
                

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