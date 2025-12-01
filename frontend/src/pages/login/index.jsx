import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseApi from "../../api/baseApi";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await baseApi.post("/auth/login", form);
      console.log("res: ", res);

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("Tài khoản hoặc mật khẩu không đúng");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Đăng nhập</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Tên đăng nhập
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Nhập tên đăng nhập"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Nhập mật khẩu"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded text-blue-600" />
            Nhớ đăng nhập
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Quên mật khẩu?
          </a>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
        >
          Đăng nhập
        </button>
      </form>

      {/* Register link */}
      <p className="mt-6 text-sm text-center text-gray-600">
        Chưa có tài khoản?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Đăng ký ngay
        </a>
      </p>
    </div>
  );
}
