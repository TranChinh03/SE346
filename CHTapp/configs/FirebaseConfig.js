// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import * as firebase from "firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDk89Et_vVlZj-HazHSszs59zBr0RbWApQ',
  authDomain: 'se346-cht.firebaseapp.com',
  projectId: 'se346-cht',
  storageBucket: 'se346-cht.appspot.com',
  messagingSenderId: '156771911745',
  appId: '1:156771911745:web:4cc3d0c9e15a7affe71ec0',
  measurementId: 'G-FMXLSRRV5Q',
};

// Initialize Firebase
// export  const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// const db = firebase.firestore();
// db.settings({
//   experimentalForceLongPolling: true,
//   useFetchStreams: false,
// });

export {firebase}