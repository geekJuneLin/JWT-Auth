const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../modal/User");

// @route   POST /api/user
// @desc    Create a new user
// @access  Public
router.route("/").post((req, res) => {
  const { userName, email, password } = req.body;

  User.find({ email }).then((user) => {
    if (user) return res.status(400).json({ error: "Email already exists!" });

    var newUser = new User({
      userName: userName,
      email: email,
      password: password,
    });

    bcrypt.genSalt((err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser.save().then((user) =>
          jwt.sign(
            { id: user.id },
            config.get("jwt-secret"),
            { expiresIn: "1h" },
            (err, token) => {
              if (err) throw err;
              res.status(400).json({
                msg: "successfully created new user",
                token: token,
              });
            }
          )
        );
      });
    });
  });
});

// @route   GET /user/:userName
// @desc    Get the token of the user
// @access  Public
router.route("/:userName").get((req, res) => {
  const userName = req.params.userName;

  User.findOne({ userName }).then((user) => {
    if (!user) return res.status(404).json({ error: "User not found!" });
    jwt.sign(
      { id: user._id },
      config.get("jwt-secret"),
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(400).json({ token: token });
      }
    );
  });
});

module.exports = router;
