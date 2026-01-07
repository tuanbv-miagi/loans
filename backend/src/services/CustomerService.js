const prisma = require("../../prisma/client");
const customerRepo = require("../repositories/CustomerRepository");
const customerInfoRepo = require("../repositories/CustomerInfoRepository");

class CustomerService {
  /**
   * Create new customer
   * @param {*} attributes
   * @returns new customer
   */
  async create(attributes) {
    return prisma.$transaction(async (tx) => {
      const newCustomer = await customerRepo.create(
        {
          accountId: attributes.accountId,
          firstName: attributes.firstName,
          lastName: attributes.lastName,
          email: attributes.email,
          phone: attributes.phone,
          nationalId: attributes.nationalId,
          address: attributes.address,
          isSpamZalo: attributes.isSpamZalo ?? 0,
          isSpamIcloud: attributes.isSpamIcloud ?? 0,
        },
        tx
      );

      await customerInfoRepo.create(
        {
          customerId: newCustomer.id,
          icloud: attributes.icloud,
          idCardFront: attributes.idCardFront ?? "",
          idCardBack: attributes.idCardBack ?? "",
          idCardIssueDate: new Date(attributes.idCardIssueDate),
          idCardIssuePlace: attributes.idCardIssuePlace,
          contactPhone1: attributes.contactPhone1,
          contactPhone2: attributes.contactPhone2,
          contactPhone3: attributes.contactPhone3,
          bankName: attributes.bankName,
          bankAccountNumber: attributes.bankAccountNumber,
          bankAccountName: attributes.bankAccountName,
          workplaceName: attributes.workplaceName,
          workplaceAddress: attributes.workplaceAddress,
          urlImages: attributes.urlImages ?? "",
        },
        tx
      );

      return newCustomer;
    });
  }

  async update(id, attributes) {};

  async delete(id) {};

  /**
   * Paginate customers with filter
   * @param {*} atttributes
   * @returns paginated customers
   */
  async paginate(atttributes) {
    const page = parseInt(atttributes.page) || 1;
    const limit = parseInt(atttributes.limit) || 20;
    const params = {
      name: atttributes.paramSearch?.name || null,
      email: atttributes.paramSearch?.email || null,
      nationalId: atttributes.paramSearch?.nationalId || null,
      phone: atttributes.paramSearch?.phone || null,
      isSpamZalo: atttributes.paramSearch?.isSpamZalo || null,
      isSpamIcloud: atttributes.paramSearch?.isSpamIcloud || null,
      page: page,
      limit: limit,
    }

    const { rows, count } = await customerRepo.findAllWithFilter(params);

    return {
      data: rows,
      pagination: {
        total: count,
        page: page,
        limit: limit,
        totalPages: Math.ceil(count / limit),
      }
    }
  };
}

module.exports = new CustomerService();
