const express = require('express');
const router = express.Router();

//this file handles all api routes

//getgame router
const eventsRouter = require('./api/eventsRouter');
router.use('/getevents', eventsRouter);

module.exports = router;