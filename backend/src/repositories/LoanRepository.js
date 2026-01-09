const prisma = require("../../prisma/client");

class LoanRepository {
  /**
   * Get loan by ID
   * @param {*} id
   * @param {*} prismaClient
   * @returns loan
   */
  findByIdWithRelations(id, prismaClient = prisma) {
    return prismaClient.loan.findFirst({
      where: {
        id: Number(id),
        deletedAt: null,
      },
      include: {
        customer: true,
      },
    });
  }

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

  /**
   * Update loan
   * @param {*} id
   * @param {*} data
   * @returns updated loan
   */
  update(id, data) {
    return prisma.loan.update({
      where: { id: Number(id) },
      data: data,
    });
  }

  /**
   * Soft delete loans by customer ID
   * @param {*} customerId
   * @param {*} prismaClient
   * @returns deleted loans
   */
  softDeleteByCustomerId(customerId, prismaClient = prisma) {
    return prismaClient.loan.updateMany({
      where: {
        customerId: Number(customerId),
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  /**
   * Get Loans with pagination
   * @param {*} params
   * @returns array of loans
   */
  async findAllWithFilter(params) {
    const where = { deletedAt: null };
    const OR = [];

    if (params.customerName?.trim()) {
      const keyword = params.customerName.trim();

      OR.push({
        customer: {
          OR: [
            { firstName: { contains: keyword } },
            { lastName: { contains: keyword } },
          ],
        },
      });
    }

    if (params.startDate) {
      where.startDate = { gte: new Date(params.startDate) };
    }

    if (params.endDate) {
      where.endDate = { lte: new Date(params.endDate) };
    }

    if (params.amount) {
      where.amount = Number(params.amount);
    }

    if (params.status) {
      where.status = Number(params.status);
    }

    if (OR.length > 0) {
      where.OR = OR;
    }

    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const skip = (page - 1) * limit;

    const [rows, count] = await Promise.all([
      prisma.loan.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          customer: true,
        },
      }),
      prisma.loan.count({ where }),
    ]);

    return { rows, count };
  }
}

module.exports = new LoanRepository();
