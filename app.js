const express = require('express');
const fs = require('fs');
const mysql = require('mysql');

// getting the config and saving it to an object
let _config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// creating database connection
const con = mysql.createConnection({
    host    : _config.mysql.host,
    user    : _config.mysql.user,
    password: _config.mysql.password,
    database: _config.mysql.database
});

// creating exress app
const app = express();

//listening for http requests on the given port
app.listen(_config.port);

// registering viewengine
app.set('view engine', 'ejs');
// how to change default views page
// app.set('views', 'private');

// listening for all pages
app.get('/', (req, res) => {
    res.render('index', { title: 'index'});
});

// 404 error when no file can be found
app.use((req, res) => {
    res.status(404).render('status/404', { title: '404'});
});