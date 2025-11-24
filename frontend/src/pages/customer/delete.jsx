import React from "react";
import baseApi from "../../api/baseApi";

export default function DeleteConfirm({ onClose, id, getList, setLoading }) {
  const deleteData = async() => {
    try {
      setLoading(true);
      await baseApi.delete(`/audio-books/delete/${id}`);
      setLoading(false);
      getList();
      onClose();
    } catch (error) {
      console.error("Lỗi upload:", error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[500px]">
        {/* Header */}
        <div className="relative mb-4">
          <button
            onClick={onclose}
            className="absolute top-1 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
          <h3 className="text-xl font-semibold text-center">
            Xác nhận xóa sách?
          </h3>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            Bạn có chắc chăc muốn xóa sách này không?
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onclose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => deleteData()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
