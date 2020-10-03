const express = require('express');
const app = express();

const mysql = require('mysql');
const _ = require('lodash');
const path = require('path'); 

//getting the config and saving it to an object
const _config = require('./config.json');
console.log('configs fetched');

//creating global data object
global.PROGRAM = {};

//creating database connection
PROGRAM.SQLcon = mysql.createConnection({
    host    : _config.mysql.host,
    user    : _config.mysql.user,
    password: _config.mysql.password,
    database: _config.mysql.database
});

//connect to database
PROGRAM.SQLcon.connect((err) => {
    if(err){
        throw err;
    }else{
        console.log('mysql connected');
    }
});

//setting the view engine
app.set('view engine', 'ejs');
//enabling post url data encoding
app.use(express.urlencoded({extended: true}));
//allowing json
app.use(express.json());

//serving static content
app.use('/content', express.static(path.join(__dirname, 'public')));

//website routes
/**TODO:
 * -make seperate router
 */
app.get('/', (req, res) => {
    res.render('index', { title: 'index'});
});

//calendar
app.get('/calendar', (req, res) => {
    res.render('calendar', { title: 'calendar'});
});

//api routes
const ApiRouter = require('./apiRouter');
app.use('/api', ApiRouter);

//404 error when no file can be found
app.use((req, res) => {
    res.status(404).render('status/404', { title: '404'});
});

//starting to listen to requests
app.listen(_config.port, () => console.log(`listening on port ${_config.port}`));
