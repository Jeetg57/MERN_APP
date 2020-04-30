const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verify = require("../verifyToken");

router.get("/:id", verify, async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    res.json(result);
  } catch (err) {
    res.json({ message: error });
  }
});

module.exports = router;
