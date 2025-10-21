import React, { useState } from "react";
import { Search, Edit, Trash2, Eye } from "lucide-react";

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

export default function CustomerPage() {
  const [search, setSearch] = useState("");

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý khách hàng</h2>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition w-[11rem] mr-[10px]">
            Xuất excel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition w-[11rem]">
            + Thêm khách hàng
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center bg-white p-4 rounded-lg shadow">
        <Search size={18} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Tìm khách hàng theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="p-3 ">STT</th>
              <th className="p-3">Tên khách hàng</th>
              <th className="p-3">SĐT</th>
              <th className="p-3">Dư nợ</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, index) => (
              <tr key={c.id} className="border-t hover:bg-gray-50 text-center">
                <td className="p-3 font-medium">{index + 1}</td>
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3">₫ {c.debt.toLocaleString()}</td>
                <td className="p-3">
                  {c.status === "Đang vay" && (
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                      {c.status}
                    </span>
                  )}
                  {c.status === "Đã tất toán" && (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                      {c.status}
                    </span>
                  )}
                  {c.status === "Quá hạn" && (
                    <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                      {c.status}
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
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Không tìm thấy khách hàng
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
