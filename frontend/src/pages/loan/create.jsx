import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import baseApi from "../../api/baseApi";
import SlideAlert from "../../components/SlideAlert";

export default function LoanCreatePage() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [amount, setAmount] = useState("");
  const [interestRate] = useState(0.4);
  const [duration] = useState(40);
  const [startDate, setStartDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [dailyPayment, setDailyPayment] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertId, setAlertId] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const customerIdFromUrl = searchParams.get("customerId");

  const getAllCustomers = async () => {
    try {
      const response = await baseApi.get(`/customers`);
      setCustomers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khách hàng:", error);
    }
  };

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

  const formatCurrency = (num) => num.toLocaleString("vi-VN") + " VNĐ";

  const handleSave = async () => {
    try {
      const due = new Date(startDate);
      const formData = {
        customerId: selectedCustomer.id,
        amount: Number(amount),
        interestRate: interestRate,
        startDate: new Date(startDate),
        dueDate: new Date(due.setDate(due.getDate() + duration)),
        paidAmount: Number(totalAmount),
      };

      await baseApi.post("/loans/create", formData);
      setIsOpenAlert(true);
      setAlertType("success");
      setAlertMsg("Tạo khoản vay thành công");
      setAlertId("loan_create");
      customerIdFromUrl
        ? navigate(`/customers/${customerIdFromUrl}/edit`)
        : navigate("/loans");
    } catch (error) {
      console.error("Lỗi khi tạo khoản vay:", error);
    }
  };

  useEffect(() => {
    const today = new Date();
    setStartDate(today.toISOString().split("T")[0]);
    getAllCustomers();
  }, []);

  useEffect(() => {
    if (!customerIdFromUrl) return;
    if (customers.length === 0) return;
    const found = customers.find((c) => c.id === Number(customerIdFromUrl));

    if (found) {
      setSelectedCustomer(found);
    }
  }, [customerIdFromUrl, customers]);

  return (
    <div className="p-6 space-y-6">
      <SlideAlert
        open={isOpenAlert}
        onClose={() => setIsOpenAlert(false)}
        type={alertType}
        message={alertMsg}
        alertId={alertId}
      />

      <h1 className="text-2xl font-semibold">Tạo mới khoản vay</h1>

      {!customerIdFromUrl && !selectedCustomer && (
        <div className="bg-white p-4 shadow rounded-lg">
          <label className="font-medium mb-2 block">Chọn khách hàng</label>
          <select
            className="border p-2 rounded w-full"
            defaultValue=""
            onChange={(e) => {
              const found = customers.find(
                (c) => c.id === Number(e.target.value)
              );
              setSelectedCustomer(found || null);
            }}
          >
            <option value="" disabled>
              -- Chọn khách hàng --
            </option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.lastName + " " + c.firstName} - {c.phone}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ===== CUSTOMER CARD ===== */}
      {selectedCustomer && (
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <i className="fas fa-user"></i> Thông tin khách hàng
          </h2>

          <div className="space-y-2">
            <InfoRow
              label="Họ và tên"
              value={
                selectedCustomer?.firstName + " " + selectedCustomer?.lastName
              }
            />
            <InfoRow label="Số căn cước" value={selectedCustomer?.nationalId} />
            <InfoRow label="Email" value={selectedCustomer?.email} />
            <InfoRow label="Số điện thoại" value={selectedCustomer?.phone} />
            <InfoRow label="Địa chỉ" value={selectedCustomer?.address} />
          </div>
        </div>
      )}

      {/* ===== LOAN FORM (chỉ hiện khi đã có customer) ===== */}
      {selectedCustomer && (
        <div className="bg-white p-6 shadow rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Thông tin khoản vay
              </h3>

              <div className="mb-4">
                <label className="font-medium">Số tiền vay</label>
                <div className="flex mt-1">
                  <input
                    type="number"
                    className="border p-2 w-full rounded-l"
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
                    readOnly
                    className="border p-2 w-full rounded-l bg-gray-100"
                  />
                  <div className="bg-gray-200 px-3 flex items-center rounded-r">
                    %
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">Thời hạn vay</label>
                  <input
                    value={duration}
                    readOnly
                    className="border p-2 w-full bg-gray-100 mt-1"
                  />
                </div>

                <div>
                  <label className="font-medium">Ngày giải ngân</label>
                  <input
                    type="date"
                    value={startDate}
                    readOnly
                    className="border p-2 w-full bg-gray-100 mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Right */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Chi tiết thanh toán
              </h3>

              <div className="space-y-4">
                <Summary
                  label="Tổng tiền phải trả"
                  value={formatCurrency(totalAmount)}
                  icon="fas fa-money-bill-wave"
                />
                <Summary
                  label="Số tiền lãi"
                  value={formatCurrency(interestAmount)}
                  icon="fas fa-percentage"
                />
                <Summary
                  label="Tiền trả mỗi ngày"
                  value={formatCurrency(dailyPayment)}
                  icon="fas fa-calendar-day"
                />
                <Summary
                  label="Ngày đáo hạn"
                  value={dueDate || "--/--/----"}
                  icon="fas fa-calendar-check"
                />
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
              Hủy
            </button>

            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => handleSave()}
            >
              Tạo khoản vay
            </button>
          </div>
        </div>
      )}
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

/* Reusable Components */
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between border-b py-2">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
