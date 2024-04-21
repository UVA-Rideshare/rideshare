import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomepagePost from './components/homepagePost.js';
import BottomNavBar from './components/navbar.js';
import { auth } from '../firebaseconfig.js';
import { signOut } from 'firebase/auth';

const ProfilePage = ({ navigation }) => {
    const user = auth.currentUser;

    const handleLogout = async () => {
        await signOut(auth).then(() => {
            navigation.navigate('Login');
        });
    }
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Text style={styles.id}>    Your email: {user.email}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  id: {
    fontSize: 18,
    marginBottom: 10,
  }, 
  button: {
    backgroundColor: 'red', 
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

export default ProfilePage;