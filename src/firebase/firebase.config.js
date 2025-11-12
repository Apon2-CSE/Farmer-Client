// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGEMOXyaLKxPgAllcB5axBRViu39XuG20",
  authDomain: "krishi-link-a5bfa.firebaseapp.com",
  projectId: "krishi-link-a5bfa",
  storageBucket: "krishi-link-a5bfa.firebasestorage.app",
  messagingSenderId: "842723690511",
  appId: "1:842723690511:web:deb1ee416304caeeeefb7a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
