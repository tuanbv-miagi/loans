const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();

const authController = {
  async login(req, res) {
    const { username, password } = req.body;

    if (username !== process.env.AUTH_USER) {
      return res.status(401).json({ message: "Tên đăng nhập không đúng" });
    }

    const passwordMatch = await bcrypt.compare(password, process.env.AUTH_PASS_HASH);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    )

    return res.json({
      message: "Đăng nhập thành công",
      status: 200,
      data: {
        token: token
      },
    });
  },

  async createAccount(req, res) {

  }
};

module.exports = authController;
