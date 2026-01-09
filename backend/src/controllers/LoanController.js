const loanService = require("../services/LoanService");

const LoanController = {
  /**
   * Get loan by ID
   * @param {*} req
   * @param {*} res
   * @returns loan
   */
  async show(req, res) {
    try {
      const { id } = req.params;
      const data = await loanService.findById(id);
      res.status(200).json({ data });
    } catch (error) {
      if (error.message === "LOAN_NOT_FOUND") {
        return res.status(404).json({
          message: "Khoản vay không tồn tại",
        });
      }

      res.status(500).json({
        message: "Lỗi server",
        error: error.message,
      });
    }
  },

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
  },

  /**
   * Update loan
   * @param {*} req
   * @param {*} res
   * @returns updated loan
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedLoan = await loanService.updateLoan(id, data);
      return res.status(200).json({
        status: 200,
        message: "Cập nhật khoản vay thành công",
        data: updatedLoan,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },

  /**
   * Delete loan
   * @param {*} req
   * @param {*} res
   * @returns deleted loan
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      await loanService.deleteData(id);
      return res.status(200).json({
        status: 200,
        message: "Xoá khoản vay thành công",
      });
    } catch (error) {
      console.error("Delete loan error: ", error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  },

  /**
   * Get paginated loans with filter
   * @param {*} req
   * @param {*} res
   * @returns array of loans with pagination
   */
  async paginate(req, res) {
    try {
      const response = await loanService.paginate(req.body);
      return res.status(200).json({
        status: 200,
        message: "Lấy danh sách khoản vay thành công",
        data: response.data,
        pagination: response.pagination,
      });
    } catch (error) {
      console.error("Get all loans error: ", error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  },
};

module.exports = LoanController;
