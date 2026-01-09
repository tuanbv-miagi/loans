const prisma = require("../../prisma/client");

class TelegramUserRepository {
  /**
   * Update telegram user
   * @param {*} customerId
   * @param {*} data
   * @returns updated telegram user
   */
  update(customerId, data, prismaClient = prisma) {
    return prismaClient.telegramUser.update({
      where: { customerId: Number(customerId) },
      data: data,
    });
  }

  /**
   * Delete telegram users by customer id
   * @param {*} customerId
   * @param {*} prismaClient
   * @returns deleted telegram users
   */
  softDeleteByCustomerId(customerId, prismaClient = prisma) {
    return prismaClient.telegramUser.updateMany({
      where: {
        customerId: Number(customerId),
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

module.exports = new TelegramUserRepository();
