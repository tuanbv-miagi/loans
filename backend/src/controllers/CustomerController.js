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
      res.status(200).json({ message: "Lấy thông tin thành công", data: response });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error: error.message });
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

      const attributes = {
        title: data.title,
        chaptersCount: data.chaptersCount,
        cover: data.cover,
        description: data.description,
        isAudioBook: data.isAudioBook === "audio",
        language: data.language,
        narrator: data.narrator,
        releaseYear: data.releaseYear,
        totalDuration: data.totalDuration,
      };

      const response = await customerService.create(attributes);
      res.status(200).json({
        message: "Thêm mới thành công",
        data: response,
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  },
};

module.exports = CustomerController;

