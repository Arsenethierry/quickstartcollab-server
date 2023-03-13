const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
  icon: { type: String, required: true },
  communityName: { type: String, required: true },
  communityType: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  collegeId: { type: Schema.Types.ObjectId, ref: "College" },
  createdAt: { type: Date, default: Date.now() },
});

const Community = mongoose.model("Community", CommunitySchema);

exports.Community = Community;
