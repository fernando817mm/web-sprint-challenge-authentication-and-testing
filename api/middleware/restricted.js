const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(500).json({
      message: "token required",
    });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err)
        res.status(500).json({
          message: "token invalid",
        });
      req.decodedJWT = decoded;
      next();
    });
  }
};
