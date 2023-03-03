const express = require('express');
var csv = require('csv');
var fs = require('fs');

const router = express.Router();
var colleges;

fs.readFile('../utils/colleges-db/database.csv', (err, data) => {
    console.log("collegues read");

    csv.parse(data, function(err, data) {
        colleges = data;

        console.log("colleges loaded");
    });
})

router.post('/total', function(req, res) {
    var str = {
        total: colleges.length
    }
})
//login route
router.post('/login', loginUser)

module.exports = router;