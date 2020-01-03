const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(400).json({ msg: "Token is invalid" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwt"));
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};
