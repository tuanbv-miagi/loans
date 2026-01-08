const prisma = require("../../prisma/client");

class LoanRepository {
  /**
   * Create new loan
   * @param {*} data
   * @param {*} prismaClient
   * @returns new loan
   */
  create(data, prismaClient = prisma) {
    return prismaClient.loan.create({
      data,
    });
  }
}

module.exports = new LoanRepository();