import React, { useState } from "react";
import { Validator } from "../../utils/Validator";
import baseApi from "../../api/baseApi";
import Contants from "../../utils/Contants.jsx";
import SlideAlert from "../../components/SlideAlert.jsx";

export default function CreateUserPage({ onClose, setLoading, getAllData }) {
  const form = {
    userName: "",
    fullName: "",
    password: "",
    passwordConfirm: "",
    email: "",
    role: "user",
  };

  const textScreens = {
    fullName: "Họ và tên",
    userName: "Tên đăng nhập",
    password: "Mật khẩu",
    passwordConfirm: "Xác nhận mật khẩu",
    email: "Email",
    role: "Vai trò",
    status: "Trạng thái",
  };

  const [formData, setFormData] = useState(form);
  const [errors, setErrors] = useState({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const messages = {};

    messages.fullName = Validator.require(formData.fullName, textScreens.fullName);
    messages.userName = Validator.require(formData.userName, textScreens.userName);
    messages.password = Validator.require(formData.password, textScreens.password);
    messages.email =
      Validator.require(formData.email, textScreens.email) || Validator.email(formData.email, textScreens.email);
    messages.role = Validator.require(formData.role, textScreens.role);
    // messages.status = Validator.require(formData.status, textScreens.status);
    messages.passwordConfirm = Validator.require(formData.passwordConfirm, textScreens.passwordConfirm);

    if (formData.password && formData.passwordConfirm && formData.password !== formData.passwordConfirm) {
      messages.passwordConfirm = "Mật khẩu xác nhận không khớp";
    }

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
      await baseApi.post("/users/create", formData);
      getAllData();
      closeModal();
    } catch (error) {
      setIsOpenAlert(true);
      setAlertType("error");
      setAlertMsg("Lỗi hệ thống, vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <SlideAlert
        open={isOpenAlert}
        onClose={() => setIsOpenAlert(false)}
        type={alertType}
        message={alertMsg}
        alertId={1}
      />
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[1000px]">
        <div className="relative">
          <button
            onClick={() => closeModal()}
            className="absolute top-1 right-3 text-gray-500 hover:text-gray-800 text-2xl leading-none"
          >
            &times;
          </button>
          <h3 className="text-xl font-semibold mb-4 text-center">
            Thêm mới người dùng
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className=" w-[90%] m-[auto]">
            <div className="mb-[10px]">
              <label className="block text-sm font-medium mb-1">
                {textScreens.fullName}
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                placeholder="Nhập họ và tên"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            <div className="mb-[10px]">
              <label className="block text-sm font-medium mb-1">
                {textScreens.userName}
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                placeholder="Nhập tên đăng nhập"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">{errors.userName}</p>
              )}
            </div>

            <div className="mb-[10px]">
              <label className="block text-sm font-medium mb-1">
                {textScreens.password}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="mb-[10px]">
              <label className="block text-sm font-medium mb-1">
                {textScreens.passwordConfirm}
              </label>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                placeholder="Nhập lại mật khẩu"
              />
              {errors.passwordConfirm && (
                <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>
              )}
            </div>

            <div className="mb-[10px]">
              <label className="block text-sm font-medium mb-1">
                {textScreens.email}
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                placeholder="Nhập email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-medium text-gray-700 text-sm">
                {textScreens.role}
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all"
              >
                {Contants.roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => closeModal()}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
