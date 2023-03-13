const express = require("express");
const { createCommunity } = require("../controllers/community.js");

const router = express.Router();

router.post("/:id", createCommunity);

module.exports = router;
