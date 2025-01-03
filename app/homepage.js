import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView } from 'react-native';
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
  const [refreshing, setRefreshing] = useState(false);

  // const toggleRefresh = () => {
  //   setRefreshNeeded(prev => !prev);
  // }


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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
      const handleGetPosts = async () => {
        const data = await getDocs(collection(db, 'posts'));
        setPosts(data.docs);
        setLoading(false);
      };

      handleGetPosts();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000)
  }, []);


  const removePostFromState = (postId) => {
    setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
  };

  const renderItem = ({ item }) => {
    console.log('item:', item.data().location);
  
    return (
      <HomepagePost
        postID={item.id}
        title={item.data().title}
        body={item.data().body}
        author={item.data().author}
        location={item.data().location}
        listOfComments={item.data().comments}
        isPostAuthor={authorEmail === item.data().author}
        onPostDeleted={removePostFromState}
        navigation={navigation}
      />
    );
  };

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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
          }
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
