import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyAMbF6lsKh4QvOrK7iC9zAr3ihnjU1qmQ4",
    authDomain: "ecommerce-17057.firebaseapp.com",
    projectId: "ecommerce-17057",
    storageBucket: "ecommerce-17057.appspot.com",
    messagingSenderId: "689994564048",
    appId: "1:689994564048:web:4b0f69eb2615e9c75ab9d5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();