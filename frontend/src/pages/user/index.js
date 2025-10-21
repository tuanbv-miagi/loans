import React, { useState } from "react";
import { Search, Edit, Trash2, Eye, UserPlus, Lock } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Nguyễn Văn Admin",
    email: "admin@example.com",
    role: "Admin",
    status: "Hoạt động",
  },
  {
    id: 2,
    name: "Trần Thị Nhân Viên",
    email: "staff@example.com",
    role: "Nhân viên",
    status: "Khóa",
  },
  {
    id: 3,
    name: "Lê Văn Kế Toán",
    email: "accountant@example.com",
    role: "Kế toán",
    status: "Hoạt động",
  },
];

export default function UserPage() {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          <UserPlus size={18} />
          Thêm người dùng
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center bg-white p-4 rounded-lg shadow">
        <Search size={18} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Tìm theo tên hoặc email..."
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
              <th className="p-3">Họ tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">Vai trò</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, index) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  {u.status === "Hoạt động" ? (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                      Hoạt động
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                      Khóa
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
                  <button className="text-gray-600 hover:text-gray-800">
                    <Lock size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Không tìm thấy người dùng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (demo) */}
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
