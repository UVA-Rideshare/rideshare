import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Button, StyleSheet, Text, Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { auth } from '../firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';


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
        Alert.alert('Success!', 'Account created!')
        navigation.navigate('Homepage');
        
      } catch (error) {
        Alert.alert('Try again...','Account creation failed. Make sure password is at least 6 characters long.');
        console.log(error)
      }
    } else{
      Alert.alert('Are you really a UVA student...','Please use a valid Virginia University email address.');
    }

  };

  return (
    <TouchableWithoutFeedback style={styles.feedback} onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <View style={styles.inputContainer}>    
        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          onFocus={() => Haptics.selectionAsync()}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          onFocus={() => Haptics.selectionAsync()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signUpButton} onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          handleSignUp();
        }}>

          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
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
  signUpButton: {
    backgroundColor: '#19C3EF', // Vibrant green
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
},
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
},
});

export default SignUpScreen;