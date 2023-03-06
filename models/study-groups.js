const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studyGroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  members: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
      }
  }]
});

const StudyGroup = mongoose.model('StudyGroup', studyGroupSchema);
