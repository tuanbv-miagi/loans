import React from "react";
import { useNavigate } from "react-router-dom";

export default function ShowPage() {
  const navigate = useNavigate();
  const customer = {
    id: 123,
    full_name: "Nguyễn Văn A",
    national_id: "0123456789",
    email: "vana@example.com",
    phone: "0901234567",
    address: "Hà Nội",
  };

  const customerInfo = {
    icloud: "vana@icloud.com",
    id_card_issue_date: "2020-10-10",
    id_card_issue_place: "Công an Hà Nội",

    contact_phone_1: "0901111111",
    contact_phone_2: "0902222222",
    contact_phone_3: "0903333333",

    bank_name: "Vietcombank",
    bank_account_number: "1234567890",
    bank_account_name: "NGUYEN VAN A",

    workplace_name: "Công ty ABC",
    workplace_address: "123 Đống Đa, Hà Nội",

    images_url: [
      "uploads/cccd_1.jpg",
      "uploads/cccd_2.jpg",
      "uploads/cccd_3.jpg"
    ]
  };

  const accountInfo = {
    spam_zalo: "on",
    spam_icloud: "off",
  };

  const loanStats = {
    numberLoans: 5,
    overdueLoans: 1,
    totalAmount: 50000000,
    totalInterest: 7000000,
  };

  const loans = [
    {
      amount: 10000000,
      interest_rate: 0.05,
      day_amount: 200000,
      received_amount: 9500000,
      paid_amount: 12000000,
      start_date: "2024-01-10",
      due_date: "2024-02-10",
      status: "Đã trả",
    },
    {
      amount: 20000000,
      interest_rate: 0.1,
      day_amount: 350000,
      received_amount: 19000000,
      paid_amount: 25000000,
      start_date: "2024-03-01",
      due_date: "2024-04-01",
      status: "Trễ hạn",
    }
  ];

  // Format
  const images = customerInfo.images_url || [];

  const formatCurrency = (value) =>
    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <div className="p-4 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
        <div>
          <h1 className="text-xl font-semibold">Thông tin chi tiết khách hàng</h1>
          <div className="flex space-x-3 mt-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
              Active
            </span>
            <span className="text-gray-600 font-medium">#{customer.id}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow flex items-center gap-2"
          >
            <i className="fas fa-plus"></i> Tạo khoản vay mới
          </button>

          <button
            className={`px-4 py-2 rounded-lg shadow flex items-center gap-2 ${
              accountInfo.spam_zalo === "off"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 text-white"
            }`}
          >
            <i className="fas fa-sms"></i> Spam Zalo SMS
          </button>

          <button
            className={`px-4 py-2 rounded-lg shadow flex items-center gap-2 ${
              accountInfo.spam_icloud === "off"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 text-white"
            }`}
          >
            <i className="fas fa-cloud"></i> Spam Cloud iPhone
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Thông tin khách hàng */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <i className="fas fa-user"></i> Thông tin khách hàng
          </h2>

          <div className="space-y-2">
            <InfoRow label="Họ và tên" value={customer.full_name} />
            <InfoRow label="Số căn cước" value={customer.national_id} />
            <InfoRow label="Email" value={customer.email} />
            <InfoRow label="Số điện thoại" value={customer.phone} />
            <InfoRow label="Địa chỉ" value={customer.address} />
          </div>
        </div>

        {/* Thông tin khoản vay */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <i className="fas fa-money-bill-wave"></i> Thông tin khoản vay
          </h2>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <StatBox label="Số lần vay" value={loanStats.numberLoans} />
            <StatBox label="Số lần trả chậm" value={loanStats.overdueLoans} />
            <StatBox label="Tổng tiền vay" value={formatCurrency(loanStats.totalAmount)} />
            <StatBox label="Tổng tiền lãi" value={formatCurrency(loanStats.totalInterest)} />
          </div>
        </div>

        {/* Thông tin cơ bản */}
        <div className="bg-white p-4 shadow rounded-lg lg:col-span-2">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <i className="fas fa-images"></i> Thông tin cơ bản
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <InfoRow label="iCloud" value={customerInfo.icloud} />
              <InfoRow label="Ngày cấp CCCD" value={customerInfo.id_card_issue_date} />
              <InfoRow label="Nơi cấp" value={customerInfo.id_card_issue_place} />
              <InfoRow label="SĐT người thân 1" value={customerInfo.contact_phone_1} />
              <InfoRow label="SĐT người thân 2" value={customerInfo.contact_phone_2} />
              <InfoRow label="SĐT người thân 3" value={customerInfo.contact_phone_3} />
            </div>

            <div className="space-y-2">
              <InfoRow label="Ngân hàng" value={customerInfo.bank_name} />
              <InfoRow label="Số tài khoản" value={customerInfo.bank_account_number} />
              <InfoRow label="Tên tài khoản" value={customerInfo.bank_account_name} />
              <InfoRow label="Nơi làm việc" value={customerInfo.workplace_name} />
              <InfoRow label="Địa chỉ nơi làm" value={customerInfo.workplace_address} />
            </div>
          </div>

          <h2 className="font-semibold mt-6 mb-3">Ảnh CCCD/CMND</h2>
          {images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={`/${img}`}
                  className="w-full h-32 object-cover rounded shadow"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Không có ảnh.</p>
          )}
        </div>

        {/* Lịch sử vay */}
        <div className="bg-white p-4 shadow rounded-lg lg:col-span-2">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <i className="fas fa-history"></i> Lịch sử vay
          </h2>

          <table className="w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <Th>STT</Th>
                <Th>Số tiền vay</Th>
                <Th>Lãi suất</Th>
                <Th>Trả mỗi ngày</Th>
                <Th>Số tiền nhận</Th>
                <Th>Tổng phải trả</Th>
                <Th>Ngày vay</Th>
                <Th>Ngày trả</Th>
                <Th>Trạng thái</Th>
              </tr>
            </thead>

            <tbody>
              {loans.map((loan, index) => (
                <tr key={index} className="border-t">
                  <Td>{index + 1}</Td>
                  <Td>{formatCurrency(loan.amount)}</Td>
                  <Td>{loan.interest_rate * 100}%</Td>
                  <Td>{formatCurrency(loan.day_amount)}</Td>
                  <Td>{formatCurrency(loan.received_amount)}</Td>
                  <Td>{formatCurrency(loan.paid_amount)}</Td>
                  <Td>{formatDate(loan.start_date)}</Td>
                  <Td>{formatDate(loan.due_date)}</Td>
                  <Td>{loan.status}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/* Reusable Components */
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between border-b py-2">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const StatBox = ({ label, value }) => (
  <div className="p-3 bg-gray-100 rounded-lg">
    <div className="text-gray-500">{label}</div>
    <div className="text-xl font-semibold">{value}</div>
  </div>
);

const Th = ({ children }) => (
  <th className="p-2 border text-sm font-semibold">{children}</th>
);

const Td = ({ children }) => (
  <td className="p-2 border text-sm">{children}</td>
);
