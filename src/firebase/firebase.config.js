// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaWshR-CwKKdJpmUzSek30Pjn8F-BZpCI",
  authDomain: "studymate-b37fa.firebaseapp.com",
  projectId: "studymate-b37fa",
  storageBucket: "studymate-b37fa.firebasestorage.app",
  messagingSenderId: "31376805033",
  appId: "1:31376805033:web:8c9aac5ec8e140c51eedb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(app);