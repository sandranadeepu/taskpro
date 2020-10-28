 import firebase from "firebase"
var firebaseConfig = {
    apiKey: "AIzaSyDQ1zsALWX0nlWRUrc-1pqbY4BtAEFVOHk",
    authDomain: "taskpro-41058.firebaseapp.com",
    databaseURL: "https://taskpro-41058.firebaseio.com",
    projectId: "taskpro-41058",
    storageBucket: "taskpro-41058.appspot.com",
    messagingSenderId: "806287060168",
    appId: "1:806287060168:web:8b0fef20a055e23efa89fd"
  };
  // Initialize Firebase
 var firebaseDb= firebase.initializeApp(firebaseConfig);
 export default firebaseDb.database().ref();