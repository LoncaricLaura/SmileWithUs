import  firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBd0t3c1Kqp3qMEfvq1VULcgRXNvplY7-g",
    authDomain: "worldofsmiles-a3ec5.firebaseapp.com",
    projectId: "worldofsmiles-a3ec5",
    storageBucket: "worldofsmiles-a3ec5.appspot.com",
    messagingSenderId: "510163061435",
    appId: "1:510163061435:web:79f40a752bc87a85b7f79e",
    measurementId: "G-ES4RXBTCBD"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore()
let storage = firebase.storage()

export { firebase, db, storage }