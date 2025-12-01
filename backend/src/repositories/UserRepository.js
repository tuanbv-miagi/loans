const prisma = require('../../prisma/client');
const { Op } = require("sequelize");

class UserRepository {
  /**
   * Get user by id
   * @param {*} id
   * @returns user
   */
  findById(id) {
    return prisma.user.findByPk({
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
      where: {id: id},
      data: data,
    })
  }

  /**
   * Get all users
   * @returns array of users
   */
  getAllUsers() {
    return prisma.user.findMany({
      where: { deletedAt: null },
      orderby: { createdAt: 'desc' },
    });
  }

  findAllWithFilter(params) {
    const condditions = {};

    const offset = (params.page - 1) * params.limit;

    // Find by username
    if (params.userName) {
      condditions.userName = {
        [Op.like]: `%${params.userName}%`
      }
    }

    // Find by email
    if (params.email) {
      condditions.email = {
        [Op.like]: `%${params.email}%`
      }
    }

    // Find by role
    if (params.role) {
      condditions.role = params.role;
    }

    // Find by status
    if (params.status) {
      condditions.status = params.status;
    }

    const { ros, count } = prisma.user.findAndCountAll({
      where: condditions,
      limit: params.limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
    });

    return { rows, count };
  }
}

module.exports = new UserRepository();