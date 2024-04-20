// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8nVYzA08vGn9_4RvIHSSeZRfLxc2glf4",
  authDomain: "hoorides-d5680.firebaseapp.com",
  projectId: "hoorides-d5680",
  storageBucket: "hoorides-d5680.appspot.com",
  messagingSenderId: "647384862737",
  appId: "1:647384862737:web:725326dd056792902321b0",
  measurementId: "G-VTCVW1G98G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default app;
export {db};