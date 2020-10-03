const express = require('express');
const router = express.Router();

//this file handles all event related api calls

//get events for certain month
router.get('/:year/:month', (req, res) => {
    let answer = Object();
    if(!isNaN(req.params.year) && !isNaN(req.params.month)){
        let query = `SELECT eventID, eventName, eventDescription, UNIX_TIMESTAMP(eventStartTime) as eventStartTime FROM events WHERE YEAR(eventStartTime) = ${PROGRAM.SQLcon.escape(req.params.year)} AND MONTH(eventStartTime) = ${PROGRAM.SQLcon.escape(req.params.month)}`;
        PROGRAM.SQLcon.query(query, (err, result) => {
            if(err){
                console.error(err);
                res.status(500).json({status: 'ERROR', errorCode: 'Something went wrong while requesting data'});
            }else{
                res.json({status: 'OK', data: result});
            }
        });
    }else{
        res.status(405).json({status: 'ERROR', errorCode: 'Supplied data is invalid'});
    }
});

module.exports = router;