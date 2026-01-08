const prisma = require("../../prisma/client");

class CustomerInfoRepository {
  /**
   * Get customer info by customer ID
   * @param {*} customerId
   * @param {*} prismaClient
   * @returns customer info
   */
  getDataByCustomerId(customerId, prismaClient = prisma) {
    return prismaClient.customerInfo.findFirst({
      where: { customerId: customerId, deletedAt: null },
    });
  }

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

  /**
   * Update customer info
   * @param {*} id
   * @param {*} data
   * @returns updated customer info
   */
  upsert(customerId, data, prismaClient = prisma) {
    return prismaClient.customerInfo.upsert({
      where: { customerId: Number(customerId) },
      update: data,
      create: {
        customerId: Number(customerId),
        ...data,
      },
    });
  }
}

module.exports = new CustomerInfoRepository();
