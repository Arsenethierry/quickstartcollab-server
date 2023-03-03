const jwt = require('jsonwebtoken');

const genAuthToken = (user) => {
    const secretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign({
        username: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName:user.lastName,
        rollNumber:user.rollNumber

    }, secretKey)
    return token;
}

module.exports = genAuthToken;