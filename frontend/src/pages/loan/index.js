import React, { useState } from "react";
import { Search, Edit, Trash2, Eye } from "lucide-react";

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
  const [search, setSearch] = useState("");

  const filtered = loans.filter((l) =>
    l.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý khoản vay</h2>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition w-[11rem] mr-[10px]">
            Xuất excel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition w-[11rem]">
            + Thêm khoản vay
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center bg-white p-4 rounded-lg shadow">
        <Search size={18} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Tìm theo tên khách hàng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none"
        />
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
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-800">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
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
    </div>
  );
}
