const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
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

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/add.html"));
})

app.get('/all', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/all.html"));
})

app.get('/api/characters', (req, res) => {
    var char_update = firebase.database().ref('characters/');
    char_update.on('value', function (snapshot) {
        res.send(snapshot.val())
    });



    // res.sendFile(path.join(__dirname, "../api/seeds.json"));
})

app.get('/api/characters/:character', (req, res) => {
    var char_update = firebase.database().ref('characters/');
    char_update.on('value', function (snapshot) {
        snapshot.val().forEach(element => {
            var input = req.params.character
            if (element.routeName === input.toLowerCase().trim()) {
                res.send(element)
            } else {
                console.log("broke")
            }
        });
    });
}) 

app.use("/api/characters", (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    console.log(req.body)
    res.end(JSON.stringify(req.body, null, 2))

    var key = firebase.database().ref().push().key
    firebase.database().ref('characters/' + key).update(req.body)
    
})

console.log('listening on port 3005');
console.log('try:');
console.log('  GET /add.html');

app.listen(3005, () => console.log('You are on Port 3005!'))