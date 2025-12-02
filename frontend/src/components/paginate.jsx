import React, { useState } from "react";

export default function Paginate({ setPage, page, total, setLimit, limit, getList }) {
  const onChangeLimit = (e) => {
    setLimit(Number(e.target.value))
    setPage(1);
    getList();
  }

  return total > 1 && (
    <div className="flex justify-between items-center gap-4 mt-4">
      <div className="flex items-center gap-2">
        <label className="text-gray-700 text-sm font-medium">Hiển thị:</label>
        <select
          value={limit}
          onChange={(e) => onChangeLimit(e)}
          className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value={10}>10 / trang</option>
          <option value={20}>20 / trang</option>
          <option value={50}>50 / trang</option>
        </select>
      </div>

        <div className="flex items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-3 py-1 rounded ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Trước
          </button>

          {[...Array(total)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === total}
            onClick={() => setPage(page + 1)}
            className={`px-3 py-1 rounded ${
              page === total
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Sau
          </button>
        </div>
    </div>
  );
}
