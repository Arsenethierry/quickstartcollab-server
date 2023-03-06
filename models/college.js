const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    collegeId: {
        type: Number,
        required: true
    },
    members: [String],
    membersCount: {
        type: Number,
        default: 0
    }
},
{ timestamps: true }
);

const CollegeModel = mongoose.model('College', collegeSchema);

exports.CollegeModel = CollegeModel