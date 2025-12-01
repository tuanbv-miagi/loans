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
      const data = await userService.paginate(req.body);

      return res.status(data.status).json({data});
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

      return res.status(data.status).json({data});
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

      return res.status(data.status).json({data});
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
      const data = await userService.delete(req.params.id);

      return res.status(data.status).json({data});
    } catch (error) {
      console.error("Delete user error: ", error);
      return res.status(500).json({ message: "Lỗi server"});
    }
  }
};

module.exports = userController;
