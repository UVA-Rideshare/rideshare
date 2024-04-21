import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomepagePost from './components/homepagePost.js';
import BottomNavBar from './components/navbar.js';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';

import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseconfig';

const Homepage = ({ navigation }) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshNeeded, setRefreshNeeded] = useState(false);
  const authorEmail = auth.currentUser.email;

  const toggleRefresh = () => {
    setRefreshNeeded(prev => !prev);
  }

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

  const removePostFromState = (postId) => {
    setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
  };

  const renderItem = ({ item }) => (
    
    <HomepagePost
      postID={item.id}
      title={item.data().title}
      body={item.data().body}
      author={item.data().author}
      isPostAuthor={(authorEmail === item.data().author)}
      refresh = {toggleRefresh}
      onPostDeleted = {removePostFromState}

    />
    
  );

  const keyExtractor = (item) => item.id;

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
        <View style={{flex: 1}}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
        </View>
        <BottomNavBar navigation={navigation}></BottomNavBar>
        </>
        
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  navContainer: {
    flex: 1,
  }
});

export default Homepage;
