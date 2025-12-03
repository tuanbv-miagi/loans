import React, { useState } from "react";
import { Search, Edit, Trash2, Eye, Eraser } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog";

const loans = [
  {
    id: 1,
    customer: "Nguyễn Văn A",
    amount: 50000000,
    interestRate: 5,
    startDate: "2025-08-01",
    dueDate: "2025-09-01",
    status: "Đang vay",
  },
  {
    id: 2,
    customer: "Trần Thị B",
    amount: 100000000,
    interestRate: 6,
    startDate: "2025-07-15",
    dueDate: "2025-08-15",
    status: "Quá hạn",
  },
  {
    id: 3,
    customer: "Lê Văn C",
    amount: 30000000,
    interestRate: 4,
    startDate: "2025-07-25",
    dueDate: "2025-08-25",
    status: "Tất toán",
  },
];

export default function LoanPage() {
  const form = {
    customerName: "",
    startDate: "",
    endDate: "",
    status: "",
    amount: "",
  };
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [formSearch, setFormSearch] = useState(form);

  const filtered = loans.filter((l) =>
    l.customer.toLowerCase().includes(search.toLowerCase())
  );

  const redirectDetail = (id) => {
    navigate(`/loans/${id}`);
  };

  const redirectCreate = () => {
    navigate("/loans/create");
  };

  const handleChangeFormSearch = (e) => {
    const { name, value } = e.target;
    setFormSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    // TODO handle logic
  };

  const resetForm = () => {
    setFormSearch(form);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý khoản vay</h2>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition w-[11rem] mr-[10px]">
            Xuất excel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition w-[11rem]"
            onClick={() => redirectCreate()}
          >
            + Thêm khoản vay
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        <div className="text-[20px] font-bold">Thông tin tìm kiếm</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Nhập tên sách */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Tên khách hàng
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                name="customerName"
                placeholder="Nhập tên khách hàng"
                value={formSearch.customerName || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Nhập số tiền */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">Số tiền</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                name="amount"
                placeholder="Nhập số tiền"
                value={formSearch.amount || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Chọn từ ngày */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">Từ ngày</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="date"
                name="fromDate"
                value={formSearch.fromDate || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Chọn đến ngày */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Đến ngày
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="date"
                name="toDate"
                value={formSearch.toDate || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
          {/* Chọn trạng thái */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Trạng thái
            </label>
            <select
              name="status"
              value={formSearch.status ?? ""}
              onChange={handleChangeFormSearch}
              placeholder="Chọn trạng thái"
              className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all"
            >
              <option value=""></option>
              <option value="true">Hoạt động</option>
              <option value="false">Khóa</option>
            </select>
          </div>
        </div>

        {/* Nút tìm kiếm */}
        <div className="flex justify-end">
          <button
            onClick={() => resetForm()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <div className="flex align-anchor">
              <Eraser size={20} />
              <span className="ml-[5px]">Làm mới</span>
            </div>
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-3">
            <div className="flex align-anchor">
              <Search size={20} />
              <span className="ml-[5px]">Tìm kiếm</span>
            </div>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">STT</th>
              <th className="p-3">Khách hàng</th>
              <th className="p-3">Số tiền vay</th>
              <th className="p-3">Lãi suất</th>
              <th className="p-3">Ngày vay</th>
              <th className="p-3">Ngày đến hạn</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l, index) => (
              <tr key={l.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{l.customer}</td>
                <td className="p-3">₫ {l.amount.toLocaleString()}</td>
                <td className="p-3">{l.interestRate}%</td>
                <td className="p-3">{l.startDate}</td>
                <td className="p-3">{l.dueDate}</td>
                <td className="p-3">
                  {l.status === "Đang vay" && (
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                      {l.status}
                    </span>
                  )}
                  {l.status === "Tất toán" && (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                      {l.status}
                    </span>
                  )}
                  {l.status === "Quá hạn" && (
                    <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                      {l.status}
                    </span>
                  )}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => redirectDetail(1)}
                  >
                    <Eye size={18} />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-800">
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => setIsOpenModalDelete(true)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  Không tìm thấy khoản vay
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (demo tĩnh) */}
      <div className="flex justify-end gap-2">
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Trước
        </button>
        <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          2
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Sau
        </button>
      </div>

      <ConfirmDialog
        open={isOpenModalDelete}
        title="Xác nhận xoá thông tin khoản vay?"
        message="Bạn có chắc muốn xoá mục này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleDelete}
        onCancel={() => setIsOpenModalDelete(false)}
      />
    </div>
  );
}
