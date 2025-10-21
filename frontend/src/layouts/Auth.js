import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      {/* Pattern nhẹ để nền không quá trống */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full text-blue-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <defs>
            <pattern
              id="dots"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Form login */}
      <div className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Quản lý Vay Lãi
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Đăng nhập để tiếp tục
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
