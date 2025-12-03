import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoanCreatePage() {
  const navigate = useNavigate();
  const customer = {
    id: 10,
    full_name: "Nguyễn Văn A",
    national_id: "012345678900",
    phone: "0987654321",
  };

  const [amount, setAmount] = useState("");
  const [interestRate] = useState(0.4);
  const [duration] = useState(40);
  const [startDate, setStartDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [dailyPayment, setDailyPayment] = useState(0);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const today = new Date();
    setStartDate(today.toISOString().split("T")[0]);
  }, []);

  const calculateLoan = (inputAmount) => {
    const amt = Number(inputAmount);
    if (!amt || amt <= 0) return;

    const interestMoney = amt * (interestRate / 100) * duration;
    const total = amt + interestMoney;
    const daily = total / duration;

    setInterestAmount(interestMoney);
    setTotalAmount(total);
    setDailyPayment(daily);

    const due = new Date(startDate);
    due.setDate(due.getDate() + duration);
    setDueDate(due.toLocaleDateString("vi-VN"));
  };

  const formatCurrency = (num) =>
    num.toLocaleString("vi-VN") + " VNĐ";

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold">Tạo mới khoản vay</h1>

      {/* Customer Card */}
      <div className="flex items-center bg-white p-4 shadow rounded-lg gap-4">
        <div className="text-5xl text-gray-400">
          <i className="fas fa-user-circle"></i>
        </div>

        <div>
          <h3 className="text-lg font-semibold">{customer.full_name}</h3>
          <div className="text-gray-600 space-x-4 flex">
            <span>
              <i className="fas fa-id-card"></i> CCCD: {customer.national_id}
            </span>
            <span>
              <i className="fas fa-phone"></i> {customer.phone}
            </span>
          </div>
        </div>
      </div>

      {/* Loan Form */}
      <div className="bg-white p-6 shadow rounded-lg">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left Form */}
            <div>
              <h3 class="text-lg font-semibold mb-4">Thông tin khoản vay</h3>

              <div className="mb-4">
                <label className="font-medium">Số tiền vay</label>
                <div className="flex mt-1">
                  <input
                    type="number"
                    className="border p-2 w-full rounded-l"
                    placeholder="Nhập số tiền"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      calculateLoan(e.target.value);
                    }}
                  />
                  <div className="bg-gray-200 px-3 flex items-center rounded-r">
                    VNĐ
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="font-medium">Lãi suất</label>
                <div className="flex mt-1">
                  <input
                    type="number"
                    value={interestRate}
                    className="border p-2 w-full rounded-l bg-gray-100"
                    readOnly
                  />
                  <div className="bg-gray-200 px-3 flex items-center rounded-r">
                    %
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">Thời hạn vay</label>
                  <div className="flex mt-1">
                    <input
                      type="number"
                      value={duration}
                      className="border p-2 w-full rounded-l bg-gray-100"
                      readOnly
                    />
                    <div className="bg-gray-200 px-3 flex items-center rounded-r">
                      Ngày
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-medium">Ngày giải ngân</label>
                  <input
                    type="date"
                    className="border p-2 w-full rounded bg-gray-100 mt-1"
                    value={startDate}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Chi tiết thanh toán</h3>

              <div className="space-y-4">
                <Summary label="Tổng tiền phải trả" value={formatCurrency(totalAmount)} icon="fas fa-money-bill-wave" />
                <Summary label="Số tiền nhận lại" value={formatCurrency(interestAmount)} icon="fas fa-percentage" />
                <Summary label="Tiền trả mỗi ngày" value={formatCurrency(dailyPayment)} icon="fas fa-calendar-day" />
                <Summary label="Ngày đáo hạn" value={dueDate || "--/--/----"} icon="fas fa-calendar-check" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              onClick={() => navigate(-1)}
            >
              <i className="fas fa-times"></i> Hủy
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <i className="fas fa-check"></i> Tạo khoản vay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Summary({ label, value, icon }) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
      <div className="flex items-center gap-2 text-gray-600">
        <i className={icon}></i> {label}
      </div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
