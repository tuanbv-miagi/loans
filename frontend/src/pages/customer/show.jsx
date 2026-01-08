import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseApi from "../../api/baseApi";
import SlideAlert from "../../components/SlideAlert";

export default function ShowPage() {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertId, setAlertId] = useState("");
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Format
  const images = customer?.customerInfo?.images_url || [];

  const formatCurrency = (value) =>
    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getDetail = async () => {
    try {
      setLoading(true);
      const response = await baseApi.get(`/customers/${id}`);
      setCustomer(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setIsOpenAlert(true);
      setAlertId("customer_detail_error");
      setAlertMsg(
        error?.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau"
      );
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  const redirectList = () => {
    navigate("/customers");
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  return (
    <div className="p-4 space-y-6">
      <SlideAlert
        open={isOpenAlert}
        onClose={() => setIsOpenAlert(false)}
        type={alertType}
        message={alertMsg}
        alertId={alertId}
      />
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
        <div>
          <h1 className="text-xl font-semibold">
            Thông tin chi tiết khách hàng
          </h1>
          <div className="flex space-x-3 mt-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
              Mã khách hàng: {customer?.id}
            </span>
            <span className="text-gray-600 font-medium">
              #{customer?.lastName + " " + customer?.firstName}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg shadow flex items-center gap-2 bg-gray-400 cursor-not-allowed`}
          >
            <i className="fas fa-sms"></i>
            {customer?.isSpamZalo == "0"
              ? " Spam Zalo SMS"
              : "Đang Spam Zalo SMS"}
          </button>

          <button
            className={`px-4 py-2 rounded-lg shadow flex items-center gap-2 bg-gray-400 cursor-not-allowed`}
          >
            <i className="fas fa-cloud"></i>{" "}
            {customer?.isSpamIcloud == "0"
              ? " Spam Cloud iPhone"
              : " Đang Spam Cloud iPhone"}
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
            <InfoRow
              label="Họ và tên"
              value={customer?.firstName + " " + customer?.lastName}
            />
            <InfoRow label="Số căn cước" value={customer?.nationalId} />
            <InfoRow label="Email" value={customer?.email} />
            <InfoRow label="Số điện thoại" value={customer?.phone} />
            <InfoRow label="Địa chỉ" value={customer?.address} />
          </div>
        </div>

        {/* Thông tin khoản vay */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <i className="fas fa-money-bill-wave"></i> Thông tin khoản vay
          </h2>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <StatBox label="Số lần vay" value={customer?.loans?.length || 0} />
            <StatBox
              label="Số lần trả chậm"
              value={
                customer?.loans?.filter((loan) => loan.status == "1")?.length ||
                0
              }
            />
            <StatBox
              label="Tổng tiền vay"
              value={formatCurrency(
                customer?.loans?.reduce((sum, loan) => sum + loan.amount, 0) ||
                  0
              )}
            />
            <StatBox
              label="Tổng tiền lãi"
              value={formatCurrency(
                customer?.loans?.reduce(
                  (sum, loan) => sum + loan.receivedAmount,
                  0
                ) || 0
              )}
            />
          </div>
        </div>

        {/* Thông tin cơ bản */}
        <div className="bg-white p-4 shadow rounded-lg lg:col-span-2">
          <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <i className="fas fa-images"></i> Thông tin cơ bản
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <InfoRow label="iCloud" value={customer?.customerInfo?.icloud} />
              <InfoRow
                label="Ngày cấp CCCD"
                value={formatDate(customer?.customerInfo?.idCardIssueDate)}
              />
              <InfoRow
                label="Nơi cấp"
                value={customer?.customerInfo?.idCardIssuePlace}
              />
              <InfoRow
                label="SĐT người thân 1"
                value={customer?.customerInfo?.contactPhone1}
              />
              <InfoRow
                label="SĐT người thân 2"
                value={customer?.customerInfo?.contactPhone2}
              />
              <InfoRow
                label="SĐT người thân 3"
                value={customer?.customerInfo?.contactPhone3}
              />
            </div>

            <div className="space-y-2">
              <InfoRow
                label="Ngân hàng"
                value={customer?.customerInfo?.bankName}
              />
              <InfoRow
                label="Số tài khoản"
                value={customer?.customerInfo?.bankAccountNumber}
              />
              <InfoRow
                label="Tên tài khoản"
                value={customer?.customerInfo?.bankAccountName}
              />
              <InfoRow
                label="Nơi làm việc"
                value={customer?.customerInfo?.workplaceName}
              />
              <InfoRow
                label="Địa chỉ nơi làm"
                value={customer?.customerInfo?.workplaceAddress}
              />
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
              {customer?.loans.map((loan, index) => (
                <tr key={index} className="border-t">
                  <Td>{index + 1}</Td>
                  <Td>{formatCurrency(loan.amount)}</Td>
                  <Td>{loan.interestRate * 100}%</Td>
                  <Td>{formatCurrency(loan.dayAmount)}</Td>
                  <Td>{formatCurrency(loan.receivedAmount)}</Td>
                  <Td>{formatCurrency(loan.paidAmount)}</Td>
                  <Td>{formatDate(loan.startDate)}</Td>
                  <Td>{formatDate(loan.dueDate)}</Td>
                  <Td>{loan.status}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={redirectList}
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Quay lại danh sách
        </button>
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

const Td = ({ children }) => <td className="p-2 border text-sm">{children}</td>;
