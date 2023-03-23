import firebase from "firebase/app";
// we need to import the above code regardless of the project because it provides the main 
//firebase path

import 'firebase/firestore'
// the above code is for obtaining the database service form firebase


import "firebase/auth"
//the above code is for authentication



const firebaseConfig = {
    apiKey: "AIzaSyA8UJtyaq4L-wSHZx0tieSFqCi58id5Wl4",
    authDomain: "paisa-tracker-476fd.firebaseapp.com",
    projectId: "paisa-tracker-476fd",
    storageBucket: "paisa-tracker-476fd.appspot.com",
    messagingSenderId: "902038581269",
    appId: "1:902038581269:web:aeb77b62d5210b2c68de1c"
  };

  //initailize the firebase service,below code
firebase.initializeApp(firebaseConfig)


//initialize the each individual services,below code is meant for this and export it for its futher use
// this should be used whenever we want to interact with the firestore
const projectservice=firebase.firestore()


//initialize the auth services
const projectauth = firebase.auth();

// for creating the timestamp
const timestamp = firebase.firestore.Timestamp


export {projectservice,projectauth,timestamp}