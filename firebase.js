// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjN-xaHfBgd16rn5NWQ1heJQPv2jLfIRM",
  authDomain: "flashcard-saas-8b232.firebaseapp.com",
  projectId: "flashcard-saas-8b232",
  storageBucket: "flashcard-saas-8b232.appspot.com",
  messagingSenderId: "628570166348",
  appId: "1:628570166348:web:7d25b91baf17cf5f2190e9",
  measurementId: "G-4J2GCBF9LF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};