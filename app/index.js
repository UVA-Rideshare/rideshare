import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, username, password);
      navigation.navigate('Homepage');
    } catch (error) {
      console.log(error);
      alert('Sign in failed')
    } finally {
      //can put something in here if needed
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.logoContainer}>
        {/* You'll need to add an Image component for the logo if you have one */}
        <Text style={styles.title}>HooRides</Text>
        <Image source={require('../assets/logo.png')} style={styles.navIcon}></Image>
      </SafeAreaView>
      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  navIcon: {
    width: 100, // Increased width to make the icon bigger
    height: 100, // Increased height to make the icon bigger
    marginBottom: 5,
    alignSelf: 'center', // Centers the icon horizontally
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingLeft: 10,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 10,
  },
  signUpText: {
    marginTop: 20,
    color: 'blue',
  },
});

export default LoginScreen;