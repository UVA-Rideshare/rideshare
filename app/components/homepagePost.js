import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList, ActivityIndicator, TouchableWithoutFeedback} from 'react-native';
import { db, auth} from '../../firebaseconfig';
import { doc, collection, deleteDoc, updateDoc, runTransaction} from 'firebase/firestore';
import { set } from 'firebase/database';
import { Divider } from '@gluestack-ui/themed';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.']);


//https://docs.expo.dev/versions/latest/sdk/map-view/ full set up on docs here (outside of expo)


const HomepagePost = ({postID, title, body, author, location, listOfComments, isPostAuthor, onPostDeleted, navigation}) => {

    const [renderMap, setRenderMap] = useState(false);
    const [region, setRegion] = useState(null);
    const [validLocation, setValidLocation] = useState(true);
    const [myComment, setMyComment] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [myListOfComments, setMyListOfComments] = useState(listOfComments);
    const locationName = location;
    Geocoder.init('AIzaSyAJZFUmOcXJLFKN2v6TvB2V9S_-2cOhfYs');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const json = await Geocoder.from(locationName);
            setRegion({
              latitude: json.results[0].geometry.location.lat,
              longitude: json.results[0].geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          } catch (error) {
            setValidLocation(false);
          }
        };
      
        fetchData();
      }, []);

    
    const commentItemRender = ({ item }) => {

        return (
        <View style={styles.commentItem}>
            <Text style={styles.commentText}>{item}</Text>
        </View>)
    }
    const handleDelete = () => {
        Alert.alert(
            "Confirm Delete", 
            "Are you sure that you want to delete your post?", 
            [ 
                {
                    text: "Delete", 
                    onPress: async () => {
                        await deleteDoc(doc(db, 'posts', postID)); 
                        onPostDeleted(postID);
                        Alert.alert("Your post has been deleted.")   
                        
                    }, 
                    style: "cancel",
                }, 
                {
                    text: "Cancel", 
                }
            ]
        )
    }

    const handleUpdate = async () => {
        navigation.navigate('UpdatePost', {postID: postID, oldTitle: title, oldBody: body});
        
    }

    const viewMap = () => {
        if (validLocation){
            setRenderMap(!renderMap);
        }
        else {
            Alert.alert("No location", "The author did not input a valid location");
        }
    }

    const keyExtractor = (item) => item.id;

    const handleSubmitComment = async () => {
        setIsPending(true);

        try {
            await runTransaction(db, async (transaction) => {
                const docRef = doc(db, "posts", postID);
                const docSnapshot = await transaction.get(docRef);
                const comments = docSnapshot.data().comments || [];
                comments.push(auth.currentUser.email + ": " + myComment);
                transaction.update(docRef, { comments });
              });

              setMyListOfComments(prevComments =>[...prevComments, auth.currentUser.email + ": " + myComment])
              
              setMyComment('');
              Alert.alert("Comment submitted")
        } catch (error) {
            console.error("An error occured: " + error)
        }

        setIsPending(false);
    }

    return (
        <View style={styles.postContainer}>

            <Text style={styles.title}>{title}</Text>
            
            <View style={styles.objectContainer}>
            <Text style={styles.author}>Author: {author}</Text>
            </View>

            <View style={styles.postContainer}>
            <Text style={styles.body}>{body}</Text>
            </View>

            
            {isPostAuthor && 
            (
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            </View>
            )
            }

            <TouchableOpacity style={styles.mapButton} onPress={viewMap}>
                <Text style={styles.buttonText}>Toggle Map</Text>
            </TouchableOpacity>
            
            {renderMap && (
                <MapView style={styles.map} region={region}></MapView>
            )}
            
            <TextInput
                style={styles.input}
                placeholder="Add a comment"
                multiline
                value={myComment}
                onChangeText={(text) => setMyComment(text)}
            />

            {(!isPending && myComment !== '') && <TouchableOpacity style={styles.submitButton} onPress={handleSubmitComment}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>}
            {isPending && <ActivityIndicator size="large" />}

            <FlatList
                data={myListOfComments}
                renderItem = {commentItemRender}
                keyExtractor={keyExtractor}
                ListEmptyComponent={() => <Text>No comments yet.</Text>}
            />

            

            
        </View>
    );
};

const styles = StyleSheet.create({
    commentText: {
        color: '#333333', // Darker text color for better readability
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Distribute buttons evenly
        marginTop: 10,
    },
    postContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 20,
    },
    objectContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#cccccc',
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#222222',
        marginBottom: 10,
    },
    author: {
        fontWeight: 'bold',
        color: '#555555',
        marginBottom: 5,
        fontSize: 16,
    },
    body: {
        color: '#666666',
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#ff5252', // Vibrant red
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 10,
    },
    updateButton: {
        backgroundColor: '#4caf50', // Vibrant green
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 10,
    },
    mapButton: {
        backgroundColor: '#ffa726', // Orange shade
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#81c784', // Soft green
        paddingVertical: 7,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    map: {
        width: '100%',
        height: 300, // Fixed height for map
        marginTop: 10,
        borderRadius: 8,
    },
    input: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 15,
        fontSize: 16,
        borderRadius: 8,
        color: '#333333',
    },
    commentItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eeeeee',
        
    },
});

export default HomepagePost;
