import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const BottomNavBar = ({ navigation }) => {
  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity onPress={() => {navigation.navigate('Homepage')}} style={styles.navItem}>
        {/* Replace with your home icon */}
        <Image source={require('../../assets/home.png')} style={styles.navIcon} />
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {navigation.navigate('CreatePost')}} style={styles.navItem}>
        {/* Replace with your add icon */}
        <Image source={require('../../assets/addpost.png')} style={styles.navIcon} />
        <Text>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {console.log("not done yet")}} style={styles.navItem}>
        {/* This would typically be the profile picture */}
        <Image source={require('../../assets/profilepicture.png')} style={styles.navIcon} />
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingBottom: 20, // Adjust for iPhone X notch if needed
    paddingTop: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 30, // Adjust to match your icon size
    height: 30, // Adjust to match your icon size
    marginBottom: 5,
  },
});

export default BottomNavBar;
