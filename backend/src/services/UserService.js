const bcrypt = require("bcrypt");
const userRepo = require("../repositories/UserRepository");

class UserService {
  /**
   * Get all users
   * @returns array of users
   */
  async getAllUsers() {
    const users = await userRepo.getAllUsers();
    return {
      status: 200,
      message: "Lấy danh sách người dùng thành công",
      data: users,
    };
  }

  /**
   * Get paginated users with filter
   * @param {*} atttributes
   * @returns array of users with pagination
   */
  async paginate(atttributes) {
    const page = parseInt(atttributes.page) || 1;
    const limit = parseInt(atttributes.limit) || 20;
    const params = {
      userName: atttributes.paramSearch?.userName || null,
      email: atttributes.paramSearch?.email || null,
      role: atttributes.paramSearch?.role || null,
      status: atttributes.paramSearch?.status || null,
      page: page,
      limit: limit,
    };
    const { rows, count } = await userRepo.findAllWithFilter(params);

    return {
      data: rows,
      pagination: {
        total: count,
        page: page,
        limit: limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  /**
   * Create new user
   * @param {*} attributes
   * @returns new user
   */
  async create(attributes) {
    const existEmail = await userRepo.findByEmail(attributes.email);
    if (existEmail) {
      return {
        status: 400,
        message: "Email đã tồn tại",
      };
    }

    const hashedPassword = await bcrypt.hash(attributes.password, 10);
    delete attributes.passwordConfirm;
    const newUser = await userRepo.create({
      ...attributes,
      password: hashedPassword,
      spamZalo: 0,
      avatarUrl: "",
      role: attributes.role == "user" ? 0 : 1,
      status: 0,
      lastLogin: new Date(),
    });

    return {
      id: newUser.id,
      userName: newUser.userName,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
    };
  }

  /**
   * Update user
   * @param {*} id
   * @param {*} attributes
   * @returns updated user
   */
  async update(id, attributes) {
    const user = await userRepo.findById(id);
    if (!user) {
      return {
        status: 404,
        message: "Người dùng không tồn tại",
      };
    }
    const updatedUser = await userRepo.update(id, attributes);
    return updatedUser;
  }

  /**
   * Delete user
   * @param {*} id
   * @returns user
   */
  async delete(id) {
    const user = await userRepo.findById(id);
    if (!user) {
      return {
        status: 404,
        message: "Người dùng không tồn tại",
      };
    }
    const deletedUser = await userRepo.update(id, { deletedAt: new Date() });

    return deletedUser;
  }

  /**
   * Lock user
   * @param {*} id
   * @returns update user
   */
  async lock(id) {
    const user = await userRepo.findById(id);
    if (!user) {
      return null;
    }
    const updateUser = await userRepo.update(id, { status: 1 });
    return updateUser;
  }

  /**
   * Unlock user
   * @param {*} id
   * @returns update user
   */
  async unLock(id) {
    const user = await userRepo.findById(id);
    if (!user) {
      return null;
    }
    const updateUser = await userRepo.update(id, { status: 0 });
  }
}

module.exports = new UserService();
