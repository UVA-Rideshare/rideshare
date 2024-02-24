import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/index.js';
import SignUpScreen from './app/signup.js';
import Homepage from './app/homepage.js'
import CreatePost from './app/createPost.js';

const Stack = createNativeStackNavigator();

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
