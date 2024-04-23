import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { auth } from '../firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountCreationSuccessful, setAccountCreationSuccessful] = useState(false);
  const [accountCreationFailure, setAccountCreationFailure] = useState(false);

  const handleSignUp = async () => {
    //create a user with an email and password, and store using Firebase's auth product
    if (/^[^@]+@virginia\.edu$/.test(email)){
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created!')
        navigation.navigate('Login');
        
      } catch (error) {
        alert('Account creation failed. Make sure password is at least 6 characters long.');
        console.log(error)
      }
    } else{
      alert('Please use a valid Virginia University email address.');
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} color="#5cb85c" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
    paddingLeft: 10,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 10,
  },
});

export default SignUpScreen;