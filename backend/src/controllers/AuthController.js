const authService = require("../services/AuthService");

const authController = {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const data = await authService.login(username, password);

      return res.status(data.status).json({
        status: data.status,
        message: data.message,
        data: data.data || null,
      });
    } catch (error) {
      console.error("Login error: ", error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  },

  async createAccount(req, res) {},
};

module.exports = authController;
