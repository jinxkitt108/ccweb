// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCI_NUm20riIV0OpsuFMIzK4daRK58ppo8",
  authDomain: "ccweb-cc466.firebaseapp.com",
  databaseURL: "https://ccweb-cc466.firebaseio.com",
  projectId: "ccweb-cc466",
  storageBucket: "ccweb-cc466.appspot.com",
  messagingSenderId: "822560219003",
  appId: "1:822560219003:web:8822f0a250ccf402b027de"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let auth = firebaseApp.auth();
let db = firebaseApp.firestore();
let timestamp = firebase.firestore.Timestamp
let fieldValue = firebase.firestore.FieldValue

export { auth, db, timestamp, fieldValue };
