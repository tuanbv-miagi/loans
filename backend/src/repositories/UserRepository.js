const prisma = require("../../prisma/client");
const { Op } = require("sequelize");

class UserRepository {
  /**
   * Get user by id
   * @param {*} id
   * @returns user
   */
  findById(id) {
    return prisma.user.findUnique({
      where: { id: id, deletedAt: null },
    });
  }

  /**
   * Find user by userName
   * @param {*} userName
   * @returns user or null
   */
  findByUserName(userName) {
    return prisma.user.findFirst({
      where: { userName: userName, deletedAt: null },
    });
  }

  /**
   * Find user by email
   * @param {*} email
   * @returns user or null
   */
  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email: email, deletedAt: null },
    });
  }

  /**
   * Update last login time
   * @param {*} id
   * @returns updated user
   */
  updateLastLogin(id) {
    return prisma.user.update({
      where: { id: id },
      data: { lastLogin: new Date() },
    });
  }

  /**
   * Create user
   * @param {*} data
   * @returns created user
   */
  create(data) {
    return prisma.user.create({
      data: data,
    });
  }

  /**
   * Update user
   * @param {*} id
   * @param {*} data
   * @returns updated user
   */
  update(id, data) {
    return prisma.user.update({
      where: { id: id },
      data: data,
    });
  }

  /**
   * Get all users
   * @returns array of users
   */
  getAllUsers() {
    return prisma.user.findMany({
      where: { deletedAt: null },
      orderby: { createdAt: "desc" },
    });
  }

  /**
   * Get user with pagination
   * @param {*} params
   * @returns array of users
   */
  async findAllWithFilter(params) {
    const where = { deletedAt: null };
    const OR = [];
    if (params.userName?.trim()) {
      OR.push({
        userName: { contains: params.userName.trim() },
      });
    }
    if (params.email?.trim()) {
      OR.push({
        email: { contains: params.email.trim() },
      });
    }
    if (OR.length > 0) where.OR = OR;

    if (params.role) {
      where.role = params.role === "admin" ? 1 : 0;
    }

    if (params.status) {
      where.status = params.status === "active" ? 0 : 1;
    }

    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const skip = (page - 1) * limit;

    const [rows, count] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    return { rows, count };
  }
}

module.exports = new UserRepository();
