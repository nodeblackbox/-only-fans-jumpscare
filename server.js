// Import the required modules
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mysql = require("mysql2");
const session = require("express-session");
const bcrypt = require("bcryptjs");



// Initialize database connection
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// // Define user schema and model
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
// });

// const User = mongoose.model('User', userSchema);

// // Create a new user and save it
// const user = new User({
//     name: 'John',
//     email: 'john@example.com',
//     password: 'password',
// });

// user.save()
//     .then(savedUser => {
//         console.log(savedUser.name + ' saved to bookstore collection.');
//     })
//     .catch(err => console.error(err));

// Initialize Express app
const app = express();




const port = process.env.PORT || 3000;
require("dotenv").config();

const apiKey = process.env.API_KEY;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Point Express to your views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Route for a sample page Current i am adding users manually
app.get('/CeeCee', (req, res) => {
    res.render('CeeCee', { title: 'CeeCee' });
});

app.get('/lu_delights', (req, res) => {
    res.render('CeeCee', { title: 'CeeCee' });
});

app.get('/emyLove', (req, res) => {
    res.render('CeeCee', { title: 'CeeCee' });
});

app.get('/Splinter', (req, res) => {
    res.render('CeeCee', { title: 'CeeCee' });
});

app.get('/BushMaster', (req, res) => {
    res.render('CeeCee', { title: 'CeeCee' });
});
app.get('/grapes', (req, res) => {
    res.render('CeeCee', { title: 'CeeCee' });
});
app.get('/', (req, res) => {
    res.render('CeeCee', { title: 'CeeCee' });
});


























// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});