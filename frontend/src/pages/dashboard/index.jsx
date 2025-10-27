import React from "react";

const chartData = [
  { month: "Jan", disbursed: 120, interest: 80 },
  { month: "Feb", disbursed: 150, interest: 100 },
  { month: "Mar", disbursed: 90, interest: 70 },
  { month: "Apr", disbursed: 200, interest: 130 },
  { month: "May", disbursed: 170, interest: 120 },
];

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-bold">Tổng quan quản lý vay</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Khách hàng</h3>
          <p className="text-2xl font-bold mt-2">320</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Dư nợ hiện tại</h3>
          <p className="text-2xl font-bold mt-2">₫ 1.200.000.000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Lãi tháng này</h3>
          <p className="text-2xl font-bold mt-2">₫ 85.000.000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Khoản vay quá hạn</h3>
          <p className="text-2xl font-bold mt-2">12</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Khoản vay gần đây</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Khách hàng</th>
              <th className="p-3">Số tiền</th>
              <th className="p-3">Ngày vay</th>
              <th className="p-3">Ngày đến hạn</th>
              <th className="p-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">Nguyễn Văn A</td>
              <td className="p-3">₫ 50.000.000</td>
              <td className="p-3">01/08/2025</td>
              <td className="p-3">01/09/2025</td>
              <td className="p-3">
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                  Đang trả
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Trần Thị B</td>
              <td className="p-3">₫ 100.000.000</td>
              <td className="p-3">15/07/2025</td>
              <td className="p-3">15/08/2025</td>
              <td className="p-3">
                <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                  Quá hạn
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Lê Văn C</td>
              <td className="p-3">₫ 30.000.000</td>
              <td className="p-3">25/07/2025</td>
              <td className="p-3">25/08/2025</td>
              <td className="p-3">
                <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-600">
                  Sắp đến hạn
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
