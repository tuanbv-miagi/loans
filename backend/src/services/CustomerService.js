const customers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phone: "0901234567",
    debt: 50000000,
    status: "Đang vay",
  },
  {
    id: 2,
    name: "Trần Thị B",
    phone: "0912345678",
    debt: 0,
    status: "Đã tất toán",
  },
  {
    id: 3,
    name: "Lê Văn C",
    phone: "0934567890",
    debt: 20000000,
    status: "Quá hạn",
  },
];

const CustomerService = {
  async getAll() {
    return customers;
  },

  async create(attributes) {

  },

  async update(id, attributes) {},

  async delete(id) {},
};

module.exports = CustomerService;
