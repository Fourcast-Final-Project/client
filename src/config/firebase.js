import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCKJBEtmZAU1B3sEWJ9FdT0ks8Q3uIJX9o",
    authDomain: "fourcast-pizza.firebaseapp.com",
    databaseURL: "https://fourcast-pizza.firebaseio.com/",
    projectId: "fourcast-pizza",
    storageBucket: "fourcast-pizza.appspot.com",
    messagingSenderId: "694146073936",
    appId: "1:694146073936:web:38d554e39ee1203d449855"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  export default database