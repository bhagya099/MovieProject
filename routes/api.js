const express = require('express');
const router = express.Router();
const db = require('../database');

// This route is for passing the data from db to front-end

router.get('/', (req,res) => {
    // getting value of the user id from the session
    const userId = req.session.userId;

    // Working on the part where we show loged in user rating next to each movie on the main page
    if (typeof userId !== 'undefined') {

        // if user exists we are looking for his ratings
        db.any('SELECT * FROM movies WHERE users_id = $1;', userId )
        .then((userRatings) => {

            res.json({ userRatings });
        })
        .catch((error) => {
            console.log(error)
            res.json(error)
        });

    // if there is no user in the session, we don't need to pass anything to the page
    } else {
        res.status(400).json({"error_message":"this page is not available"});
    }
    
    
});

module.exports = router;