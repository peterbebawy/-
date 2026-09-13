// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-S8_HLnl8XdU37MS2nZjqNdQSU1vqTYM",
  authDomain: "speech-therapy-e68ee.firebaseapp.com",
  projectId: "speech-therapy-e68ee",
  storageBucket: "speech-therapy-e68ee.firebasestorage.app",
  messagingSenderId: "766272352101",
  appId: "1:766272352101:web:56874039315d00866b3b8c",
  measurementId: "G-VZF7TH20M9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
