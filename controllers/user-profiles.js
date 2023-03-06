const jwtDecode = require('jwt-decode')
const { User } = require('../models/user')

const userProfileDetails = async (req, res) => {
    var token = req?.headers?.authorization

    try {
        if (!token) {
            res.status(401).send("Unauthorized")
        } else {
            var decodedToken = jwtDecode(token)

            if (decodedToken?.email) {
                var user = await User.findOne({ email: decodedToken.email });
                res.status(200).json(user)
            }
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    userProfileDetails
}