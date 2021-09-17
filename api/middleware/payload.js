module.exports = (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;
  !username || !password
    ? res.status(400).json({
        message: "username and password required",
      })
    : next();
};
