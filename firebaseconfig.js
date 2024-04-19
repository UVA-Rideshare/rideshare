// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5Q-r2nWv99-axtfUoM5xlvCZ9DHUOE_4",
  authDomain: "uva-rideshare.firebaseapp.com",
  projectId: "uva-rideshare",
  storageBucket: "uva-rideshare.appspot.com",
  messagingSenderId: "3013726099",
  appId: "1:3013726099:web:3bb82484fa405a99712266",
  measurementId: "G-HDDRT3Y7NX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default app;
export { db};