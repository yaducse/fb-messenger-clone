import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDVb-0ztGn4iVk-cFoebdNFZD9boG2NC8E',
  authDomain: 'fb-messenger-clone-yb.firebaseapp.com',
  projectId: 'fb-messenger-clone-yb',
  storageBucket: 'fb-messenger-clone-yb.appspot.com',
  messagingSenderId: '119997956933',
  appId: '1:119997956933:web:cadba324a148e5efd4342c',
  measurementId: 'G-FEVBES98JM'
});

const db = firebaseApp.firestore();
export default db;
