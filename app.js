const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const _ = require('lodash');
const path = require('path'); 

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

const app = express();
console.log('express app created');

app.listen(_config.port);
console.log(`listening on port ${_config.port}`);

app.set('view engine', 'ejs');

// serving static content
app.use('/content', express.static(path.join(__dirname, 'public')));

//passing post data to object
app.use(express.urlencoded({ extended: true }));

// listening for all pages
// index
app.get('/', (req, res) => {
    res.render('index', { title: 'index'});
});

// calendar
app.get('/calendar', (req, res) => {
    res.render('calendar', { title: 'calendar'});
});

// calendar events api
app.get('/events/:year/:month', (req, res) => {
    let query = `SELECT eventID, eventName, eventDescription, UNIX_TIMESTAMP(eventStartTime) as eventStartTime FROM events WHERE YEAR(eventStartTime) = ${con.escape(req.params.year)} AND MONTH(eventStartTime) = ${con.escape(req.params.month)}`;
    con.query(query, (err, result) => {
        res.send(JSON.stringify(result));
    });
});

// 404 error when no file can be found
app.use((req, res) => {
    res.status(404).render('status/404', { title: '404'});
});