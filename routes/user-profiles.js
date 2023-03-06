const express = require('express');
const { userProfileDetails } = require('../controllers/user-profiles.js')

const router = express.Router();

// router.get('/search', getArticlesBySearch);
router.get('/details', userProfileDetails);

module.exports = router;