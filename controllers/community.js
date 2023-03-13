const { Community } = require("../models/community.js");
const { User } = require("../models/user.js");

const createCommunity = async (req, res) => {
  const isExist = await Community.findOne({
    communityName: req.body.communityName,
  });

  if (isExist)
    return res
      .status(409)
      .json({ message: "This community is already exist." });

  const user = await User.findOne({ _id: req.parms.id });
  if (!user) return res.status(400).json({ message: "Invalid user." });

  const community = new Community({
    icon: req.body.icon,
    communityName: req.body.communityName,
    communityType: req.body.communityType,
    userId: req.parms.id,
    collegeId: user.college[0],
  });
  await community.save();
  res.status(200).json({ community });
};

module.exports = {
  createCommunity,
};
