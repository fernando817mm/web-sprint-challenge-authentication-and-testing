const db = require("../../data/dbConfig");

module.exports = async (req, res, next) => {
  const user = req.body;
  const { username } = user;
  const exists = await db("users").where({ username }).first();
  exists
    ? res.status(500).json({
        message: "username taken",
      })
    : next();
};
