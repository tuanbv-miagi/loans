const customerService = require("../services/CustomerService");

const CustomerController = {
  /**
   * Get all data
   * @param req
   * @param res
   */
  async customers(req, res) {
    try {
      const response = await customerService.getAll();
      res
        .status(200)
        .json({ message: "Lấy thông tin thành công", data: response });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  },

  /**
   * Get customer by ID
   * @param {*} req
   * @param {*} res
   * @returns customer
   */
  async show(req, res) {
    try {
      const { id } = req.params;
      const data = await customerService.show(id);
      res.status(200).json({ data });
    } catch (error) {
      if (error.message === "CUSTOMER_NOT_FOUND") {
        return res.status(404).json({
          message: "Customer không tồn tại",
        });
      }

      res.status(500).json({
        message: "Lỗi server",
        error: error.message,
      });
    }
  },

  /**
   * Create new data
   * @param req
   * @param res
   */
  async create(req, res) {
    try {
      const data = req.body;
      const result = await customerService.create({
        ...data,
        accountId: req.user?.id,
      });
      res.status(201).json({
        message: "Thêm mới thành công",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi server",
        error: error.message,
      });
    }
  },

  /**
   * Update customer by ID
   * @param {*} req
   * @param {*} res
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const attributes = req.body;

      const result = await customerService.updateData(id, attributes);
      res.status(200).json({
        message: "Cập nhật thành công",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi server",
        error: error.message,
      });
    }
  },

  /**
   * Get paginated customers with filter
   * @param {*} req
   * @param {*} res
   * @returns array of customers with pagination
   */
  async paginate(req, res) {
    try {
      const response = await customerService.paginate(req.body);
      return res.status(200).json({
        status: 200,
        message: "Lấy danh sách khách hàng thành công",
        data: response.data,
        pagination: response.pagination,
      });
    } catch (error) {
      console.error("Get all customers error: ", error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  },
};

module.exports = CustomerController;
