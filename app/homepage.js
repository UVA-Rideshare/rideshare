import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomepagePost from './components/homepagePost.js';
import CreatePost from './createPost.js';
import BottomNavBar from './components/navbar.js';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseconfig';

const Homepage = ({ navigation }) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGetPosts = async () => {
      const data = await getDocs(collection(db, 'posts'));
      setPosts(data.docs);
      setLoading(false);
    };

    handleGetPosts();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {posts &&
            posts.map((post) => (
              <HomepagePost
                key={post.id}
                title={post.data().title}
                body={post.data().body}
                author={post.data().author}
              />
            ))}
          <BottomNavBar navigation={navigation} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
});

export default Homepage;