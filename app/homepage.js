import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomepagePost from './components/homepagePost.js';
import BottomNavBar from './components/navbar.js';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseconfig';

const Homepage = ({ navigation }) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const handleGetPosts = async () => {
        const data = await getDocs(collection(db, 'posts'));
        setPosts(data.docs);
        setLoading(false);
      };

      handleGetPosts();
    }, [])
  );

  const renderItem = ({ item }) => (
    <HomepagePost
      title={item.data().title}
      body={item.data().body}
      author={item.data().author}
    />
  );

  const keyExtractor = (item) => item.id;

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListFooterComponent={<BottomNavBar navigation={navigation} />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default Homepage;
