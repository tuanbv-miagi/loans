const prisma = require("../../prisma/client");

class CustomerInfoRepository {
  /**
   * Create customer info
   * @param {*} data
   * @returns created customer info
   */
  create(data, prismaClient = prisma) {
    return prismaClient.customerInfo.create({
      data,
    });
  }
}

module.exports = new CustomerInfoRepository();