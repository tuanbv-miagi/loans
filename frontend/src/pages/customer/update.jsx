import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseApi from "../../api/baseApi";
import SlideAlert from "../../components/SlideAlert";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertId, setAlertId] = useState("");

  const [isOpenModalSpamZalo, setIsOpenModalSpamZalo] = useState(false);
  const [isOpenModalSpamIcloud, setIsOpenModalSpamIcloud] = useState(false);

  const formatDateInput = (date) =>
    date ? new Date(date).toISOString().slice(0, 10) : "";

  const formatCurrency = (value) =>
    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getDetail = async () => {
    try {
      setLoading(true);
      const res = await baseApi.get(`/customers/${id}`);
      const data = res.data;

      setCustomer(data);

      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        nationalId: data.nationalId || "",
        isSpamZalo: data.isSpamZalo,
        isSpamIcloud: data.isSpamIcloud,

        customerInfo: {
          icloud: data.customerInfo?.icloud || "",
          idCardIssueDate: formatDateInput(data.customerInfo?.idCardIssueDate),
          idCardIssuePlace: data.customerInfo?.idCardIssuePlace || "",
          contactPhone1: data.customerInfo?.contactPhone1 || "",
          contactPhone2: data.customerInfo?.contactPhone2 || "",
          contactPhone3: data.customerInfo?.contactPhone3 || "",
          bankName: data.customerInfo?.bankName || "",
          bankAccountNumber: data.customerInfo?.bankAccountNumber || "",
          bankAccountName: data.customerInfo?.bankAccountName || "",
          workplaceName: data.customerInfo?.workplaceName || "",
          workplaceAddress: data.customerInfo?.workplaceAddress || "",
        },
      });
    } catch (error) {
      setIsOpenAlert(true);
      setAlertType("error");
      setAlertMsg(
        error?.response?.data?.message || "Không lấy được dữ liệu khách hàng"
      );
      setAlertId("customer_detail");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  /* ================= HANDLER ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    console.log("formData: ", formData);
    try {
      await baseApi.post(`/customers/update/${id}`, formData);
      setIsOpenAlert(true);
      setAlertType("success");
      setAlertMsg("Cập nhật khách hàng thành công");
      setAlertId("customer_update");

      navigate("/customers");
    } catch (error) {
      setIsOpenAlert(true);
      setAlertType("error");
      setAlertMsg(
        error?.response?.data?.message || "Cập nhật khách hàng thất bại"
      );
      setAlertId("customer_update_error");
    }
  };

  const redirectList = () => {
    navigate("/customers");
  };

  const handleSpamZalo = async (id) => {
    // TODO: Handle spam zalo
  };

  const handleSpamIcloud = async (id) => {
    // TODO: Handle spam icloud
  };

  const redictLoanCreate = (id) => {
    navigate(`/loans/create?customerId=${id}`);
  };

  if (!formData) return null;

  const images = customer?.customerInfo?.images_url || [];

  const loanStatus = (status) => {
    let text = "Đang thanh toán";
    if (status == 1) text = "Đã trả";
    if (status == 2) text = "Trễ hạn";
    return text;
  }

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
              #{customer?.lastName} {customer?.firstName}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg shadow flex items-center gap-2 bg-yellow-500 text-white`}
            onClick={() => setIsOpenModalSpamZalo(true)}
          >
            <i className="fas fa-sms"></i>
            {customer?.isSpamZalo == "0"
              ? " Spam Zalo SMS"
              : "Đang Spam Zalo SMS"}
          </button>

          <button
            className={`px-4 py-2 rounded-lg shadow flex items-center gap-2 bg-purple-600 text-white`}
            onClick={() => setIsOpenModalSpamIcloud(true)}
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
        <Card title="Thông tin khách hàng">
          <InfoRow label="Họ" value={formData.lastName}>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input w-full text-end"
            />
          </InfoRow>

          <InfoRow label="Tên" value={formData.firstName}>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input w-full text-end"
            />
          </InfoRow>

          <InfoRow label="Số căn cước">
            <input
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              className="input w-full text-end"
            />
          </InfoRow>

          <InfoRow label="Email">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input w-full text-end"
            />
          </InfoRow>

          <InfoRow label="Số điện thoại">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input w-full text-end"
            />
          </InfoRow>

          <InfoRow label="Địa chỉ">
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input w-full text-end"
            />
          </InfoRow>
        </Card>

        {/* Thông tin khoản vay (GIỮ NGUYÊN – READ ONLY) */}
        <Card title="Thông tin khoản vay">
          <div className="grid grid-cols-3 gap-4 mt-4">
            <StatBox label="Số lần vay" value={customer?.loans?.length || 0} />
            <StatBox
              label="Số lần trả chậm"
              value={
                customer?.loans?.filter((l) => l.status == "1").length || 0
              }
            />
            <StatBox
              label="Tổng tiền vay"
              value={formatCurrency(
                customer?.loans?.reduce((s, l) => s + Number(l.amount), 0) || 0
              )}
            />
          </div>
        </Card>

        {/* Thông tin cơ bản */}
        <Card title="Thông tin cơ bản" className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <InfoRow label="iCloud">
                <input
                  name="icloud"
                  value={formData.customerInfo.icloud}
                  onChange={handleCustomerInfoChange}
                  className="input w-full text-end"
                />
              </InfoRow>

              <InfoRow label="Ngày cấp CCCD">
                <input
                  type="date"
                  name="idCardIssueDate"
                  value={formData.customerInfo.idCardIssueDate}
                  onChange={handleCustomerInfoChange}
                  className="input w-full text-end"
                />
              </InfoRow>

              <InfoRow label="Nơi cấp">
                <input
                  name="idCardIssuePlace"
                  value={formData.customerInfo.idCardIssuePlace}
                  onChange={handleCustomerInfoChange}
                  className="input w-full text-end"
                />
              </InfoRow>

              <InfoRow label="SĐT người thân 1">
                <input
                  name="contactPhone1"
                  value={formData.customerInfo.contactPhone1}
                  onChange={handleCustomerInfoChange}
                  className="input w-full text-end"
                />
              </InfoRow>

              <InfoRow label="SĐT người thân 2">
                <input
                  name="contactPhone2"
                  value={formData.customerInfo.contactPhone2}
                  onChange={handleCustomerInfoChange}
                  className="input w-full text-end"
                />
              </InfoRow>

              <InfoRow label="SĐT người thân 3">
                <input
                  name="contactPhone3"
                  value={formData.customerInfo.contactPhone3}
                  onChange={handleCustomerInfoChange}
                  className="input w-full text-end"
                />
              </InfoRow>
            </div>

            <div className="space-y-2">
              <InfoRow label="Ngân hàng">
                <input
                  name="bankName"
                  value={formData.customerInfo.bankName}
                  onChange={handleCustomerInfoChange}
                  className="input w-full text-end"
                />
              </InfoRow>

              <InfoRow label="Số tài khoản">
                <input
                  name="bankAccountNumber"
                  value={formData.customerInfo.bankAccountNumber}
                  onChange={handleCustomerInfoChange}
                  className="input w-full text-end"
                />
              </InfoRow>

              <InfoRow label="Tên tài khoản">
                <input
                  name="bankAccountName"
                  value={formData.customerInfo.bankAccountName}
                  onChange={handleCustomerInfoChange}
                  className="input w-full text-end"
                />
              </InfoRow>

              <InfoRow label="Nơi làm việc">
                <input
                  name="workplaceName"
                  value={formData.customerInfo.workplaceName}
                  onChange={handleCustomerInfoChange}
                  className="input w-full text-end"
                />
              </InfoRow>

              <InfoRow label="Địa chỉ nơi làm">
                <input
                  name="workplaceAddress"
                  value={formData.customerInfo.workplaceAddress}
                  onChange={handleCustomerInfoChange}
                  className="input w-full text-end"
                />
              </InfoRow>
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
        </Card>

        {/* Lịch sử vay */}
        <div className="bg-white p-4 shadow rounded-lg lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <i className="fas fa-history"></i> Lịch sử vay
            </h2>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow flex items-center gap-2"
              onClick={() => redictLoanCreate(customer?.id)}
            >
              <i className="fas fa-plus"></i> Tạo khoản vay mới
            </button>
          </div>

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
                  <Td>{loanStatus(loan.status)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={redirectList}
          className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
        >
          Hủy
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Lưu thay đổi
        </button>
      </div>

      <ConfirmDialog
        open={isOpenModalSpamZalo}
        title="Xác nhận spam zalo khách hàng này?"
        message="Bạn có chắc muốn spam zalo khách hàng này?"
        confirmText="Xác nhận"
        cancelText="Hủy"
        onConfirm={handleSpamZalo}
        onCancel={() => setIsOpenModalSpamZalo(false)}
      />

      <ConfirmDialog
        open={isOpenModalSpamIcloud}
        title="Xác nhận spam icloud khách hàng này?"
        message="Bạn có chắc muốn spam icloud khách hàng này?"
        confirmText="Xác nhận"
        cancelText="Hủy"
        onConfirm={handleSpamIcloud}
        onCancel={() => setIsOpenModalSpamIcloud(false)}
      />
    </div>
  );
}

/* ================= UI COMPONENT ================= */
const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white p-4 shadow rounded-lg ${className}`}>
    <h2 className="font-semibold text-lg mb-3">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const InfoRow = ({ label, children }) => (
  <div className="flex justify-between border-b py-2 items-center">
    <span className="text-gray-500">{label}</span>
    <div className="w-[60%] text-right">{children}</div>
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
