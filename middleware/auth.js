const jwt = require("jsonwebtoken");
const config = require("config");

// Verify token
const auth = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) return res.status(400).json({ error: "No authorisation!" });

  try {
    jwt.verify(token, config.get("jwt-secret"), (err, decoded) => {
      if (err) return res.status(400).json({ error: "Invalid token!" });

      req.user = decoded;
      next();
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = auth;
