var firebase = require('firebase')

var config = {
    apiKey: "AIzaSyBgmG7IR3VtVxr6HXz8I9bGpF9C6In9Nnw",
    authDomain: "express-sw-game.firebaseapp.com",
    databaseURL: "https://express-sw-game.firebaseio.com",
    projectId: "express-sw-game",
    storageBucket: "",
    messagingSenderId: "779352367033"
};
firebase.initializeApp(config);

var characters =
[{
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Master",
    age: 55,
    forcePoints: 1350
  }]




function writeUserData(routeName, name, role, age, forcePoints) {
    firebase.database().ref('characters/').set(characters)
  }

  writeUserData()

