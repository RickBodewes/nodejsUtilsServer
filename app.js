const express = require('express');
const fs = require('fs');
const mysql = require('mysql');

// getting the config and saving it to an object
const _config = require('./config.json');
console.log('configs fetched');

// creating database connection
const con = mysql.createConnection({
    host    : _config.mysql.host,
    user    : _config.mysql.user,
    password: _config.mysql.password,
    database: _config.mysql.database
});

// connect to database
con.connect((err) => {
    if(err){
        throw err;
    }else{
        console.log('mysql connected');
    }
});

// creating exress app
const app = express();
console.log('express app created');

//listening for http requests on the given port
app.listen(_config.port);
console.log(`listening on port ${_config.port}`);

// registering viewengine
app.set('view engine', 'ejs');
// how to change default views page
// app.set('views', 'private');

// listening for all pages
// index
app.get('/', (req, res) => {
    res.render('index', { title: 'index'});
});

// calendar
app.get('/calendar', (req, res) => {
    res.render('calendar', { title: 'calendar'});
});

// 404 error when no file can be found
app.use((req, res) => {
    res.status(404).render('status/404', { title: '404'});
});