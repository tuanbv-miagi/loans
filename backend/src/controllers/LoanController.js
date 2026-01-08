const loanService = require("../services/LoanService");

const LoanController = {
  /**
   * Create new loan
   * @param {*} req
   * @param {*} res
   * @returns create loan
   */
  async create(req, res) {
    try {
      const data = req.body;
      const loan = await loanService.create(data);
      return res.status(201).json({
        status: 201,
        message: "Tạo khoản vay thành công",
        data: loan,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
};

module.exports = LoanController;