const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verify = require("../verifyToken");

//*Works well
router.get("/:id", verify, async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    res.json(result);
  } catch (err) {
    res.json({ message: error });
  }
});

//!Route not yet set
router.patch("/update/:id", verify, async (req, res) => {
  try {
    const update = await User.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.json(update);
  } catch (err) {
    res.send({ message: err });
  }
});

//!Route not yet set
router.delete("/delete/:id", verify, async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ _id: req.params.id });
    res.json(deleteUser);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
