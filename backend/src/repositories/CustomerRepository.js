const prisma = require("../../prisma/client");

class CustomerRepository {
  /**
   * Get all customers by account ID
   * @param {*} accountId
   * @param {*} prismaClient
   * @returns array of customers
   */
  getDataByAccountId(accountId, prismaClient = prisma) {
    return prismaClient.customer.findMany({
      where: {
        deletedAt: null,
        accountId,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Get customer by ID
   * @param {*} id
   * @param {*} prismaClient
   * @returns customer
   */
  getDataById(id, prismaClient = prisma) {
    return prismaClient.customer.findFirst({
      where: { id: Number(id), deletedAt: null },
    });
  }

  /**
   * Get customer by ID with relations
   * @param {*} id
   * @param {*} prismaClient
   * @returns customer with relations
   */
  findByIdWithRelations(id, prismaClient = prisma) {
    return prismaClient.customer.findFirst({
      where: {
        id: Number(id),
        deletedAt: null,
      },
      include: {
        customerInfo: {
          where: {
            deletedAt: null,
          },
        },
        loans: {
          where: {
            deletedAt: null,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        telegram: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }

  /**
   * Create new customer
   * @param {*} data
   * @param {*} prismaClient
   * @returns new customer
   */
  create(data, prismaClient = prisma) {
    return prismaClient.customer.create({
      data,
    });
  }

  /**
   * Update customer
   * @param {*} id
   * @param {*} data
   * @returns updated customer
   */
  update(id, data, prismaClient = prisma) {
    return prismaClient.customer.update({
      where: { id: Number(id) },
      data: data,
    });
  }

  /**
   * Find all customers with filter
   * @param {*} params
   * @param {*} prismaClient
   * @returns array of customers with pagination
   */
  async findAllWithFilter(params, prismaClient = prisma) {
    const where = { deletedAt: null };
    const OR = [];

    if (params.name?.trim()) {
      const keyword = params.name.trim();
      OR.push(
        { firstName: { contains: keyword } },
        { lastName: { contains: keyword } }
      );
    }

    if (params.email?.trim()) {
      OR.push({
        email: { contains: params.email.trim() },
      });
    }

    if (params.phone?.trim()) {
      OR.push({
        phone: { contains: params.phone.trim() },
      });
    }

    if (params.nationalId?.trim()) {
      OR.push({
        nationalId: { contains: params.nationalId.trim() },
      });
    }

    if (OR.length > 0) where.OR = OR;

    if (params.isSpamZalo) {
      where.isSpamZalo = Number(params.isSpamZalo);
    }

    if (params.isSpamIcloud) {
      where.isSpamIcloud = Number(params.isSpamIcloud);
    }

    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const skip = (page - 1) * limit;

    const [rows, count] = await Promise.all([
      prismaClient.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prismaClient.customer.count({ where }),
    ]);

    return { rows, count };
  }
}

module.exports = new CustomerRepository();
