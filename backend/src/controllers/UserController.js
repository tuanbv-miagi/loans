const userService = require("../services/UserService");

const userController = {
  /**
   * Get all users
   * @param {*} req
   * @param {*} res
   * @returns array of users
   */
  async getAllUsers(req, res) {
    try {
      const data = await userService.getAllUsers();

      return res.status(data.status).json({data});
    } catch (error) {
      console.error("Get all users error: ", error);
      return res.status(500).json({ message: "Lỗi server"});
    }
  },

  /**
   * Get paginated users with filter
   * @param {*} req
   * @param {*} res
   * @returns array of users with pagination
   */
  async paginate(req, res) {
    try {
      const response = await userService.paginate(req.body);

      return res.status(200).json({
        status: 200,
        message: "Lấy danh sách người dùng thành công",
        data: response.data,
        pagination: response.pagination
      });
    } catch (error) {
      console.error("Get all users error: ", error);
      return res.status(500).json({ message: "Lỗi server"});
    }
  },

  /**
   * Create new user
   * @param {*} req
   * @param {*} res
   * @returns new user
   */
  async create(req, res) {
    try {
      const data = await userService.create(req.body);

      return res.status(200).json({
        status: 201,
        message: "Thêm mới tài khoản thành công",
        data: data
      });
    } catch (error) {
      console.error("Create user error: ", error);
      return res.status(500).json({ message: "Lỗi server"});
    }
  },

  /**
   * Update user
   * @param {*} req
   * @param {*} res
   * @returns updated user
   */
  async update(req, res) {
    try {
      const data = await userService.update(req.params.id, req.body);

      return res.status(200).json({
        status: 200,
        message: "Cập nhật người dùng thành công",
        data: data
      });
    } catch (error) {
      console.error("Update user error: ", error);
      return res.status(500).json({ message: "Lỗi server"});
    }
  },

  /**
   * Delete user
   * @param {*} req
   * @param {*} res
   * @returns user deletion status
   */
  async delete(req, res) {
    try {
      const data = await userService.delete(parseInt(req.params?.id));

      return res.status(200).json({
        status: 200,
        message: "Xóa người dùng thành công",
        data: data,
      });
    } catch (error) {
      console.error("Delete user error: ", error);
      return res.status(500).json({ message: "Lỗi server"});
    }
  },

  /**
   * Lock user
   * @param {*} req
   * @param {*} res
   * @returns user is lock
   */
  async lock(req, res) {
    try {
      const data = userService.lock(parseInt(req.params?.id));

      return res.status(200).json({
        status: 200,
        message: "Khóa người dùng thành công",
        data: data,
      });
    } catch (error) {
      console.error("Lock user error: ", error);
      return res.status(500).json({ message: "Lỗi server"});
    }
  },

  /**
   * Unlock user
   * @param {*} req
   * @param {*} res
   * @returns user is unlock
   */
  async unLock(req, res) {
    try {
      const data = userService.unLock(parseInt(req.params?.id));

      return res.status(200).json({
        status: 200,
        message: "Mở khóa người dùng thành công",
        data: data,
      });
    } catch (error) {
      console.error("Unlock user error: ", error);
      return res.status(500).json({ message: "Lỗi server"});
    }
  }
};

module.exports = userController;
