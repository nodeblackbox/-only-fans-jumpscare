const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mysql = require("mysql2");
const helmet = require('helmet'); // Added Helmet for security headers
require('dotenv').config();
const { body, validationResult, param } = require('express-validator'); // Added Express Validator for input validation // Added Express Validator for input validation
const app = express();
const port = 3000;

app.use(helmet()); // Use Helmet to set security headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Moved sensitive data to environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "restricted_user2",
  password: process.env.DB_PASS || "Nasseur$1234",
  database: process.env.DB_NAME || "chatbot_db"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database!");
});



app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});


// nextauth

// Added input validation using Express Validator

app.post('/', [
  body('username').trim().isLength({ min: 1 }).withMessage('Username cannot be empty.')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const username = req.body.username;

  connection.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error checking for existing user in the database.");
    } else if (results.length > 0) {
      res.status(400).send("Username already exists.");
    } else {
      connection.query("INSERT INTO users (username) VALUES (?)", [username], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error inserting user into the database.");
        } else {
          res.redirect(`/${username}`);
        }
      });
    }
  });
});


// Added input validation using Express Validator
app.get('/:username', [
  param('username').trim().isLength({ min: 1 }).withMessage('Username cannot be empty.')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const username = req.params.username;
  connection.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving user from the database.");
    } else if (results.length === 0) {
      res.status(404).send("User has not been defined.");
    } else {
      res.render('reeree', { title: results[0].username });
    }
  });
});



app.listen(port, () => {
  console.log(`Express.js boilerplate app listening at http://localhost:${port}`);
});
