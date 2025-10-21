import React, { useState } from "react";

export default function SettingPage() {
  const [notifyPayment, setNotifyPayment] = useState(true);
  const [notifyDueSoon, setNotifyDueSoon] = useState(true);
  const [notifyOverdue, setNotifyOverdue] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Cài đặt hệ thống</h2>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        {/* Toggle 1 */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Thông báo lịch trả lãi</h3>
            <p className="text-sm text-gray-500">
              Gửi thông báo khi đến kỳ trả lãi định kỳ.
            </p>
          </div>
          <button
            onClick={() => setNotifyPayment(!notifyPayment)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              notifyPayment ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                notifyPayment ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>

        {/* Toggle 2 */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Thông báo sắp đến hạn</h3>
            <p className="text-sm text-gray-500">
              Nhắc nhở khách hàng trước ngày đến hạn.
            </p>
          </div>
          <button
            onClick={() => setNotifyDueSoon(!notifyDueSoon)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              notifyDueSoon ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                notifyDueSoon ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>

        {/* Toggle 3 */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Thông báo quá hạn</h3>
            <p className="text-sm text-gray-500">
              Cảnh báo khi khoản vay bị quá hạn.
            </p>
          </div>
          <button
            onClick={() => setNotifyOverdue(!notifyOverdue)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              notifyOverdue ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                notifyOverdue ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
}
