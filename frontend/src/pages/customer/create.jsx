import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Validator } from "../../utils/Validator";
import _InputField from "../../components/_InputField";
import _SelectField from "../../components/_SelectField";
import _ImageUpload from "../../components/_ImageUpload";
import baseApi from "../../api/baseApi";

export default function CreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalId: "",
    phone: "",
    icloud: "",
    gender: "0",
    email: "",
    address: "",
    amount: "",
    interestRate: "0.4",
    idCardIssueDate: "",
    idCardIssuePlace: "",
    bankName: "",
    bankAccountNumber: "",
    bankAccountName: "",
    contactPhone1: "",
    contactPhone2: "",
    contactPhone3: "",
    workplaceName: "",
    workplaceAddress: "",
  });

  const textScreens = {
    firstName: "Tên",
    lastName: "Họ",
    nationalId: "Số CCCD/CMND",
    phone: "Số điện thoại",
    icloud: "Tài khoản iCloud",
    gender: "Giới tính",
    email: "Email",
    address: "Địa chỉ",
    amount: "Số tiền vay",
    interestRate: "Lãi suất",
    idCardIssueDate: "Ngày cấp CCCD",
    idCardIssuePlace: "Nơi cấp",
    bankName: "Tên ngân hàng",
    bankAccountNumber: "Số tài khoản",
    bankAccountName: "Tên tài khoản",
    contactPhone1: "SĐT người thân 1",
    contactPhone2: "SĐT người thân 2",
    contactPhone3: "SĐT người thân 3",
    workplaceName: "Tên nơi làm việc",
    workplaceAddress: "Địa chỉ",
  };

  // upload ảnh
  const [imagePreview, setImagePreview] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const messages = {};

    messages.firstName = Validator.require(
      formData.firstName,
      textScreens.firstName
    );
    messages.lastName = Validator.require(
      formData.lastName,
      textScreens.lastName
    );
    messages.nationalId = Validator.require(
      formData.nationalId,
      textScreens.nationalId
    );
    messages.phone = Validator.require(formData.phone, textScreens.phone);
    messages.icloud = Validator.require(formData.icloud, textScreens.icloud);
    messages.email =
      Validator.require(formData.email, textScreens.email) ||
      Validator.email(formData.email, textScreens.email);
    messages.address = Validator.require(formData.address, textScreens.address);
    messages.amount = Validator.require(formData.amount, textScreens.amount);
    messages.interestRate = Validator.require(
      formData.interestRate,
      textScreens.interestRate
    );
    messages.idCardIssueDate = Validator.require(
      formData.idCardIssueDate,
      textScreens.idCardIssueDate
    );
    messages.idCardIssueDate = Validator.require(
      formData.idCardIssuePlace,
      textScreens.idCardIssuePlace
    );
    messages.bankName = Validator.require(
      formData.bankName,
      textScreens.bankName
    );
    messages.bankAccountNumber = Validator.require(
      formData.bankAccountNumber,
      textScreens.bankAccountNumber
    );
    messages.bankAccountName = Validator.require(
      formData.bankAccountName,
      textScreens.bankAccountName
    );
    messages.contactPhone1 = Validator.require(
      formData.contactPhone1,
      textScreens.contactPhone1
    );
    messages.contactPhone2 = Validator.require(
      formData.contactPhone2,
      textScreens.contactPhone2
    );
    messages.contactPhone3 = Validator.require(
      formData.contactPhone3,
      textScreens.contactPhone3
    );
    messages.workplaceName = Validator.require(
      formData.workplaceName,
      textScreens.workplaceName
    );
    messages.workplaceAddress = Validator.require(
      formData.workplaceAddress,
      textScreens.workplaceAddress
    );

    const filteredErrors = Object.fromEntries(
      Object.entries(messages).filter(([_, v]) => v)
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await baseApi.post("/customers/create", formData);
      redirectList();
    } catch (error) {
      setIsOpenAlert(true);
      setAlertType("error");
      setAlertMsg("Lỗi hệ thống, vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }

    // const form = new FormData();
    // Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    // imageFiles.forEach((file) => form.append("images_url[]", file));
  };

  const redirectList = () => {
    navigate("/customers");
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Thêm mới khách hàng
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* SECTION: THÔNG TIN CƠ BẢN */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-blue-600 pl-3">
            Thông tin cơ bản
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <_InputField
              label="Họ"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              errorMessage={errors.lastName}
            />
            <_InputField
              label="Tên"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              errorMessage={errors.firstName}
            />
            <_InputField
              label="Số CCCD/CMND"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              errorMessage={errors.nationalId}
            />
            <_InputField
              label="Số điện thoại"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={11}
              errorMessage={errors.phone}
            />
            <_InputField
              label="Tài khoản iCloud"
              name="icloud"
              value={formData.icloud}
              onChange={handleChange}
              errorMessage={errors.icloud}
            />
            <_SelectField
              label="Giới tính"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                { value: "0", label: "Nam" },
                { value: "1", label: "Nữ" },
              ]}
            />
            <_InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              errorMessage={errors.email}
            />
            <_InputField
              label="Địa chỉ"
              name="address"
              value={formData.address}
              onChange={handleChange}
              errorMessage={errors.address}
            />
            {/* <_InputField
              label="Số tiền vay"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              type="number"
              errorMessage={errors.amount}
            />
            <_InputField
              label="Lãi suất"
              name="interest_rate"
              value={formData.interestRate}
              readOnly
              errorMessage={errors.interestRate}
            /> */}
            <_InputField
              label="Ngày cấp CCCD"
              name="idCardIssueDate"
              value={formData.idCardIssueDate}
              onChange={handleChange}
              type="date"
              errorMessage={errors.idCardIssueDate}
            />
            <_InputField
              label="Nơi cấp"
              name="idCardIssuePlace"
              value={formData.idCardIssuePlace}
              onChange={handleChange}
              errorMessage={errors.idCardIssuePlace}
            />
          </div>
        </section>

        {/* SECTION: UPLOAD ẢNH */}
        <section>
          <_ImageUpload
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
        </section>

        {/* SECTION: THÔNG TIN KHÁC */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-purple-600 pl-3">
            Thông tin khác
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <_InputField
              label="Tên ngân hàng"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              errorMessage={errors.bankName}
            />
            <_InputField
              label="Số tài khoản"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              errorMessage={errors.bankAccountNumber}
            />
            <_InputField
              label="Tên tài khoản"
              name="bankAccountName"
              value={formData.bankAccountName}
              onChange={handleChange}
              errorMessage={errors.bankAccountName}
            />
            <_InputField
              label="SĐT người thân 1"
              name="contactPhone1"
              value={formData.contactPhone1}
              onChange={handleChange}
              errorMessage={errors.contactPhone1}
            />
            <_InputField
              label="SĐT người thân 2"
              name="contactPhone2"
              value={formData.contactPhone2}
              onChange={handleChange}
              errorMessage={errors.contactPhone2}
            />
            <_InputField
              label="SĐT người thân 3"
              name="contactPhone3"
              value={formData.contactPhone3}
              onChange={handleChange}
              errorMessage={errors.contactPhone3}
            />
            <_InputField
              label="Tên nơi làm việc"
              name="workplaceName"
              value={formData.workplaceName}
              onChange={handleChange}
              errorMessage={errors.workplaceName}
            />
            <_InputField
              label="Địa chỉ"
              name="workplaceAddress"
              value={formData.workplaceAddress}
              onChange={handleChange}
              errorMessage={errors.workplaceAddress}
            />
          </div>
        </section>

        {/* BUTTONS */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={redirectList}
            className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Tạo mới khách hàng
          </button>
        </div>
      </form>
    </div>
  );
}
