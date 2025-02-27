const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

const tokenBuilder = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
    password: user.password,
  };
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};

module.exports = tokenBuilder;
