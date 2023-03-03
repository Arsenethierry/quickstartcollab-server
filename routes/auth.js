const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.js')

const router = express.Router();
//register route
router.post('/', registerUser)
//login route

router.post('/sign_in', loginUser)
module.exports = router;