const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  followers: {
    type: Array,
    default: []
  },
  followings: {
    type: Array,
    default: []
  },
  username: {
    type: String,
    required: true,
    // unique: true,
    // default: function() {
    //   return this.firstName.toLowerCase().split(' ').join('') + this.lastName.toLowerCase().split(' ').join('') + Math.floor(1000 + Math.random() * 9000);
    // }
  },
  // rollNumber: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  password: {
    type: String,
    required: true
  },
  bio: String,
  college: {
    type: Array,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  // studyGroups: [{
  //   group: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'StudyGroup',
  //     required: false,
  //   },
  //   role: {
  //     type: String,
  //     enum: ['admin', 'user'],
  //     default: 'user'
  //   }
  // }]
},
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

exports.User = User
