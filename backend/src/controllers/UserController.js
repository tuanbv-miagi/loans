const userService = require("../services/UserService");

exports.getAll = (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
};
