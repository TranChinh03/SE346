// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import * as firebase from "firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
// import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq7LhFQGWkSNuu649gQ8pncXVOXkmB_bY",
  authDomain: "chtapp-3a342.firebaseapp.com",
  projectId: "chtapp-3a342",
  storageBucket: "chtapp-3a342.appspot.com",
  messagingSenderId: "725147749269",
  appId: "1:725147749269:web:36dbc134601c43ecf0449c",
  measurementId: "G-Y5SNGX8WXV"
};

// Initialize Firebase
// export  const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};