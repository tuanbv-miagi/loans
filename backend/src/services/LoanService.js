const prisma = require("../../prisma/client");
const loanRepo = require("../repositories/LoanRepository");
const crypto = require('crypto');

class LoanService {
  /**
   * Find loan by id
   * @param {*} id
   * @returns loan
   */
  async findById(id) {
    const loan = await loanRepo.findByIdWithRelations(id);
    if (!loan) {
      throw new Error("LOAN_NOT_FOUND");
    }

    return loan;
  }

  /**
   * Create new loan
   * @param {*} attributes
   * @returns new loan
   */
  async create(attributes) {
    return prisma.$transaction(async (tx) => {
      const loanCode = crypto.randomBytes(20).toString('hex').slice(0, 20);
      // Số tiền phải trả trong 40 ngày
      const paidAmount = attributes.paidAmount || (attributes.amount * (attributes.interestRate / 100) * 40 + attributes.amount);

      // Số tiền 7 ngày đầu
      const amountOfSevenDay = Math.round((paidAmount / 40) * 7);

      // Số tiền nhận về
      const amountReceived = parseInt(paidAmount - amountOfSevenDay);

      // Số tiền mỗi ngày phải trả
      const dayPayment = Math.round(amountReceived / 40);

      return await loanRepo.create(
        {
          customerId: attributes.customerId,
          loanCode: loanCode,
          amount: attributes.amount,
          interestRate: attributes.interestRate,
          startDate: new Date(attributes.startDate),
          dueDate: attributes.dueDate,
          dayAmount: dayPayment,
          receivedAmount: amountReceived,
          paidAmount: paidAmount,
          sevenDayOfAmount: amountOfSevenDay,
          status: 0, // Mới tạo
        },
        tx
      );
    });
  };

  /**
   * Update loan
   * @param {*} id
   * @param {*} attributes
   * @returns updated loan
   */
  async updateLoan(id, attributes) {
    return loanRepo.update(id, {
      ...attributes,
      status: Number(attributes.status),
    });
  };

  /**
   * Delete loan (soft delete)
   * @param {*} id
   * @returns deleted loan
   */
  async deleteData(id) {
    return loanRepo.update(Number(id), { deletedAt: new Date() });
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
      customerName: atttributes.paramSearch?.customerName || null,
      startDate: atttributes.paramSearch?.startDate || null,
      endDate: atttributes.paramSearch?.endDate || null,
      amount: atttributes.paramSearch?.amount || null,
      status: atttributes.paramSearch?.status || null,
      page: page,
      limit: limit,
    };

    const { rows, count } = await loanRepo.findAllWithFilter(params);

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

module.exports = new LoanService();
