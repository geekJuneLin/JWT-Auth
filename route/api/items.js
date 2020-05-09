const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Item = require("../../modal/Item");

// @route   GET /api/items
// @desc    Get all the items
// @access  Public
router.route("/").get((req, res) => {
  Item.find().then((items) => res.status(400).json({ data: items }));
});

// @route   POST /api/items
// @desc    Create new item
// @access  Private
router.route("/").post(auth, (req, res) => {
  const { name } = req.body;

  const newItem = new Item({
    name: name,
  });

  newItem
    .save()
    .then((item) => res.status(400).json({ msg: "created new item" }));
});

module.exports = router;
