const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/UserRepository");
require("dotenv").config();

class AuthService {
  async login(userName, password) {
    const user = await userRepo.findByUserName(userName);

    if (!user) {
      return {
        status: 401,
        message: "Tên đăng nhập hoặc mật khẩu không đúng",
      }
    }

    if (user.status !== 0) {
      return {
        status: 403,
        message: "Tài khoản bị khóa. Vui lòng liên hệ quản trị viên",
      }
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return {
        status: 401,
        message: "Mật khẩu không đúng",
      }
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    )

    await userRepo.updateLastLogin(user.id);

    return {
      status: 200,
      message: "Đăng nhập thành công",
      data: {
        token: token,
        user: {
          id: user.id,
          userName: user.userName,
          fullName: user.fullName,
          email: user.email,
          role: user.role
        }
      }
    }
  }
}

module.exports = new AuthService();