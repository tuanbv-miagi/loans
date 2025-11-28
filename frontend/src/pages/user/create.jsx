import React, { useState } from "react";
import { Validator } from "../../utils/Validator";
import baseApi from "../../api/baseApi";
import Contants from "../../utils/Contants.jsx";

export default function CreateUserPage({ onClose, setLoading }) {
  const form = {
    userName: "",
    password: "",
    passwordConfirm: "",
    email: "",
    role: "user",
    status: "",
  };

  const textScreens = {
    userName: "Tên đăng nhập",
    password: "Mật khẩu",
    passwordConfirm: "Xác nhận mật khẩu",
    email: "Email",
    role: "Vai trò",
    status: "Trạng thái",
  };

  const [formData, setFormData] = useState(form);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const messages = {};

    messages.userName = Validator.require(formData.userName);
    messages.password = Validator.require(formData.password);
    messages.email =
      Validator.require(formData.email) || Validator.email(formData.email);
    messages.role = Validator.require(formData.role);
    messages.status = Validator.require(formData.status);

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
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
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
                value={formData.role || ""}
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
