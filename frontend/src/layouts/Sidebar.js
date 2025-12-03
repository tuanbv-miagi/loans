import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, User, Users, Settings, SwatchBook, LogOut } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const menu = [
  { path: "/", label: "Bảng điều kiển", icon: <Home size={18} /> },
  { path: "/users", label: "Quản lý người dùng", icon: <Users size={18} /> },
  { path: "/customers", label: "Quản lý khách hàng", icon: <User size={18} /> },
  {
    path: "/loans",
    label: "Quản lý khoản vay",
    icon: <SwatchBook size={18} />,
  },
  { path: "/settings", label: "Cài đặt", icon: <Settings size={18} /> },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("decoded: ", decoded);
      setRole(decoded.role);
    }
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div className="w-64 text-white flex flex-col bg-[#1D2939]">
      {/* Logo */}
      <div className="px-6 py-4 text-2xl font-bold border-b border-blue-600">
        Khoản vay
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu
          .filter((item) => {
            if (item.path === "/users" && role !== 1) return false;
            return true;
          })
          .map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive ? "bg-blue-900" : "hover:bg-blue-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-blue-600">
        <button
          className="flex items-center gap-2 px-3 py-2 w-full rounded-lg hover:bg-blue-800 transition"
          onClick={logOut}
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
