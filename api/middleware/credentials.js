const db = require("../../data/dbConfig");

module.exports = async (req, res, next) => {
  const user = req.body;
  const { username } = user;

  const existence = await db("users").where({ username }).first();

  !existence
    ? res.status(500).json({
        message: "invalid credentials",
      })
    : ((req.user = existence), next());
};
