const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../models/user');
const genAuthToken = require('../utils/genAuthToken');

const registerUser = async (req, res) => {
  
  try {
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(30).required(),
      last_name: Joi.string().min(3).max(30).required(),
      username: Joi.string().required(),
      email: Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(6).max(200).required(),
      password: Joi.string().min(3).required().label('Password'),
      password_confirmation: Joi.any().equal(Joi.ref('password'))
      .required()
      .options({ messages: { 'any.only': '{{#label}} does not match'} }),
      bio: Joi.string().allow(null, ''),
      college: Joi.array()
  })

  const { error } = schema.validate(req.body.user)

  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.user.email });
  if (user) return res.status(400).send('Email already exists');

    user = new User({
      firstName: req.body.user.first_name,
      lastName: req.body.user.last_name,
      username: req.body.user.username,
      email: req.body.user.email,
      password: req.body.user.password,
      bio: req.body.user.bio,
      college: req.body.user.college
    });

    
    const salt = await bcrypt.genSalt(10);
    
    user.password = await bcrypt.hash(user.password, salt);
    // Save the user to the database
    await user.save()

    // Generate a JSON Web Token (JWT)
    const token = genAuthToken(user)
    // jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
console.log("tookkk: ",token)
    // Return the JWT to the client
    res.send(token)
  } catch (error) {
    res.status(400).send(error);
    console.log("error: ",error)
  }
}

const loginUser = async (req, res) => {
  
  try {
    // Find the user with the given email address
    const user = await User.findOne({ email: req.body.user.email });
    
    // Check if the user exists
    // console.log("user: ",req.b)
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    
    // Check if the password is correct
    const isMatch = await bcrypt.compare(req.body.user.password, user.password);
    console.log("ismatch: ",isMatch)
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Generate a JSON Web Token (JWT)
    const token = genAuthToken(user)
    // Return the JWT to the client
    res.send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  registerUser,
  loginUser
}