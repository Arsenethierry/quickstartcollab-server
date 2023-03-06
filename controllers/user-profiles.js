const jwtDecode = require('jwt-decode')
const { User } = require('../models/user')

const userProfileDetails = async (req, res) => {
    var token = req?.headers?.authorization
    console.log("token: ",token)
    try {
        if (!token) {
            res.status(401).send("Unauthorized")
        } else {
            var decodedToken = jwtDecode(token)
    console.log("decodedToken: ",decodedToken)

            // var base64Url = token.split('.')[1];
            // var decodedValue = JSON.parse(window.atob(base64Url));
            if (decodedToken?.email) {
                var user = await User.findOne({ email: decodedToken.email });
                // user = user.splice(user.indexOf(user.password))
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