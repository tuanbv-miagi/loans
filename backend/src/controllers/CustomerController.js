import * as customerService from "../services/CustomerService";

export const customers = async (req, res) => {
  try {
    const response = await customerService.getAllCustomer();
    res.status(200).json({ message: "Thành công", data: response });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
}
