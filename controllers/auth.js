const bcrypt = require('bcrypt');
const Joi = require('joi');
const { CollegeModel } = require('../models/college');
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
      password_confirmation: Joi.any().equal(Joi.ref('password'))
        .required()
        .options({ messages: { 'any.only': '{{#label}} does not match' } }),
      bio: Joi.string().allow(null, ''),
      college: Joi.array()
    })
  
    const { error } = schema.validate(req.body.user)
  
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.user.email });
    if (user) return res.status(400).send('Email already exists');
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.user.password, salt);
  
    user = new User({
      firstName: req.body.user.first_name,
      lastName: req.body.user.last_name,
      username: req.body.user.username,
      email: req.body.user.email,
      password: hashedPassword,
      bio: req.body.user.bio,
      college: req.body.user.college
    });
  
    const savedUser = await user.save();
  
    let college = await CollegeModel.findOne({ collegeId: parseInt(req.body.user.college[0]) });
    if (!college) {
      college = new CollegeModel({
        collegeId: parseInt(req.body.user.college[0]),
        members: [savedUser._id]
      });
      await college.save();
    } else {
      college.members.push(savedUser._id);
      await college.save();
    }
  
    const token = genAuthToken(savedUser);
    res.send(token);
  } catch (error) {
    res.status(400).send(error);
    console.log("error: ", error)
  }
}

const loginUser = async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.user.email });

    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(req.body.user.password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const token = genAuthToken(user)
    res.send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  registerUser,
  loginUser
}