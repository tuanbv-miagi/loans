import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import baseApi from "../../api/baseApi";
import SlideAlert from "../../components/SlideAlert";
import { Loader2 } from "lucide-react";
import { formatDateTime } from "../../utils/DateFormat";

export default function LoanEditPage() {
  const [interestRate] = useState(0.4);
  const [duration] = useState(40);
  const [startDate, setStartDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [dailyPayment, setDailyPayment] = useState(0);
  const [loan, setLoan] = useState([]);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertId, setAlertId] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const calculateLoan = (inputAmount) => {
    const amt = Number(inputAmount);
    if (!amt || amt <= 0) return;

    const interestMoney = amt * (interestRate / 100) * duration;
    const total = amt + interestMoney;
    const daily = (total - (total / 40) * 7) / duration;

    setInterestAmount(interestMoney);
    setTotalAmount(total);
    setDailyPayment(daily);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      let newValue = value;

      // checkbox
      if (type === "checkbox") {
        newValue = checked;
      }

      // select status (ép về number)
      if (name === "status") {
        newValue = value === "" ? null : Number(value);
      }

      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  const formatCurrency = (num) => num.toLocaleString("vi-VN") + " VNĐ";

  const getDetail = async () => {
    try {
      setLoading(true);
      const response = await baseApi.get(`/loans/${id}`);

      setLoan(response.data);
      calculateLoan(response.data.amount);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setIsOpenAlert(true);
      setAlertId("loan_detail_error");
      setAlertMsg(
        error?.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau"
      );
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditData = async () => {
    try {
      setLoading(true);
      await baseApi.post(`/loans/update/${id}`, formData);
      navigate(-1);
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      setIsOpenAlert(true);
      setAlertId("loan_edit_error");
      setAlertMsg(
        error?.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau"
      );
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    setStartDate(today.toISOString().split("T")[0]);
    getDetail();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {loading ? (
        <div className="flex flex-col justify-center items-center text-gray-500">
          <Loader2 className="animate-spin w-8 h-8 mb-3 text-blue-500" />
          <span>Đang tải dữ liệu...</span>
        </div>
      ) : (
        <div>
          <SlideAlert
            open={isOpenAlert}
            onClose={() => setIsOpenAlert(false)}
            type={alertType}
            message={alertMsg}
            alertId={alertId}
          />

          <h1 className="text-2xl font-semibold">Cập nhật khoản vay</h1>

          {/* ===== CUSTOMER CARD ===== */}
          <div className="bg-white p-4 shadow rounded-lg mt-[20px]">
            <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <i className="fas fa-user"></i> Thông tin khách hàng
            </h2>

            <div className="space-y-2">
              <InfoRow
                label="Họ và tên"
                value={
                  loan?.customer?.lastName + " " + loan?.customer?.firstName
                }
              />
              <InfoRow label="Số căn cước" value={loan?.customer?.nationalId} />
              <InfoRow label="Email" value={loan?.customer?.email} />
              <InfoRow label="Số điện thoại" value={loan?.customer?.phone} />
              <InfoRow label="Địa chỉ" value={loan?.customer?.address} />
            </div>
          </div>

          {/* ===== LOAN FORM (chỉ hiện khi đã có customer) ===== */}
          <div className="bg-white p-6 shadow rounded-lg mt-[20px]">
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
                      className="border p-2 w-full rounded-l bg-gray-100"
                      value={loan.amount}
                      readOnly
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

                <div className="mt-[10px]">
                  <label className="font-medium">Trạng thái</label>
                  <select
                    name="status"
                    value={loan.status ?? ""}
                    onChange={handleInputChange}
                    placeholder="Chọn trạng thái"
                    className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all w-full"
                  >
                    <option value=""></option>
                    <option value="0">Đang thanh toán</option>
                    <option value="1">Đã trả</option>
                    <option value="2">Trễ hạn</option>
                  </select>
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
                    value={
                      formatDateTime(loan.dueDate, "DD/MM/YYYY") || "--/--/----"
                    }
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
                onClick={() => handleEditData()}
              >
                Lưu thay đổi
              </button>
            </div>
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
