const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.js');
const { userProfileDetails } = require('../controllers/generals.js');

const router = express.Router();
//register route
router.post('/user_profiles/details', userProfileDetails)
//login route
module.exports = router;