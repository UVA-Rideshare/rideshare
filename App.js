import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/index.js';
import SignUpScreen from './app/signup.js';
import Homepage from './app/homepage.js'
import CreatePost from './app/createPost.js';
import { collection } from 'firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const writeDataToFirestore = async (colName, data) => {
  try {
      const ref = firebase.firestore().collection(colName).doc()
      const response = await ref.set(data);
      return response;
  } catch (error){
      return error;
  }
}

const data = {
  author: 'Ayaan Rahman',
  body: 'Going to NOVA for the Redbull event on April 20th',
  contact: 'ayaanrah99@gmail.com',
  date: 'April 20th'
}

writeDataToFirestore('Posts', data)

const readDataFromFirestore = async (colName, docID) => {
  try {
      const ref = firebase.firestore().collection(collection).doc(docID)
      const doc = await ref.get()
      if (doc.exists){
        return doc.data();
      }
      else{
        return null;
      }
  } catch (error){
      return error;
  }
}

const docID = 'RXlM1MCfenKMpsVn3es1'

readDataFromFirestore('Posts', docID).then(data => {
  if (data){
    console.log(data);
  } else{
    console.log('No document found');
  }
})

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name= "CreatePost" component={CreatePost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
