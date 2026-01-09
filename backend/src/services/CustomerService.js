const prisma = require("../../prisma/client");
const customerRepo = require("../repositories/CustomerRepository");
const customerInfoRepo = require("../repositories/CustomerInfoRepository");
const loanRepo = require("../repositories/LoanRepository");
const telegramUserRepo = require("../repositories/TelegramUserRepository");

class CustomerService {
  /**
   * Get all customers for the current account
   * @returns array of customers
   */
  async getAll() {
    return customerRepo.getDataByAccountId();
  }

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

  /**
   * Update customer
   * @param {*} id
   * @param {*} attributes
   * @returns updated customer
   */
  async updateData(id, attributes) {
    return prisma.$transaction(async (tx) => {
      const updatedCustomer = await customerRepo.update(
        id,
        {
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

      const customerInfoData = {
        icloud: attributes?.customerInfo?.icloud,
        idCardFront: attributes?.customerInfo?.idCardFront ?? "",
        idCardBack: attributes?.customerInfo?.idCardBack ?? "",
        idCardIssueDate: attributes?.customerInfo?.idCardIssueDate
          ? new Date(attributes.customerInfo.idCardIssueDate)
          : undefined,
        idCardIssuePlace: attributes?.customerInfo?.idCardIssuePlace,
        contactPhone1: attributes?.customerInfo?.contactPhone1,
        contactPhone2: attributes?.customerInfo?.contactPhone2,
        contactPhone3: attributes?.customerInfo?.contactPhone3,
        bankName: attributes?.customerInfo?.bankName,
        bankAccountNumber: attributes?.customerInfo?.bankAccountNumber,
        bankAccountName: attributes?.customerInfo?.bankAccountName,
        workplaceName: attributes?.customerInfo?.workplaceName,
        workplaceAddress: attributes?.customerInfo?.workplaceAddress,
        urlImages: attributes?.customerInfo?.urlImages ?? "",
      };

      await customerInfoRepo.upsert(id, customerInfoData, tx);

      return updatedCustomer;
    });
  }

  /**
   * Get customer by ID with relations
   * @param {*} id
   * @returns customer with relations
   */
  async show(id) {
    const customer = await customerRepo.findByIdWithRelations(id);
    if (!customer) {
      throw new Error("CUSTOMER_NOT_FOUND");
    }

    return customer;
  }

  /**
   * Delete customer
   * @param {*} id
   * @returns deleted customer
   */
  async deleteData(id) {
    return prisma.$transaction(async (tx) => {
      const customerId = Number(id);

      const updatedCustomer = await customerRepo.update(
        customerId,
        { deletedAt: new Date() },
        tx
      );

      await Promise.all([
        customerInfoRepo.softDeleteByCustomerId(customerId, tx),
        loanRepo.softDeleteByCustomerId(customerId, tx),
        telegramUserRepo.softDeleteByCustomerId(customerId, tx),
      ]);

      return updatedCustomer;
    });
  }

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
    };

    const { rows, count } = await customerRepo.findAllWithFilter(params);

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
}

module.exports = new CustomerService();
