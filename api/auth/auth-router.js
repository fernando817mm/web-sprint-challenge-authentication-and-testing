const router = require("express").Router();
const payload = require("../middleware/payload");
const existence = require("../middleware/existence");
const credentials = require("../middleware/credentials");
const User = require("../auth/model");
const tokenBuilder = require("./token-builder");

const bcrypt = require("bcryptjs");

router.post("/register", payload, existence, (req, res, next) => {
  const user = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  User.insert(user)
    .then((user) => res.status(200).json(user))
    .catch(next);
});

router.post("/login", payload, credentials, (req, res) => {
  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = tokenBuilder(req.user);
    res.status(200).json({
      message: `welcome, ${req.user.username}`,
      token,
    });
  } else {
    res.status(500).json({
      message: "invalid credentials",
    });
  }
});

module.exports = router;
