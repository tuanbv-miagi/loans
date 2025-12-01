import React, { useEffect, useState } from "react";
import { Search, Edit, Trash2, Eye, RotateCcw, Eraser } from "lucide-react";
import baseApi from "../../api/baseApi";
import DeleteConfirm from "./delete";

const customers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phone: "0901234567",
    debt: 50000000,
    status: "Đang vay",
  },
  {
    id: 2,
    name: "Trần Thị B",
    phone: "0912345678",
    debt: 0,
    status: "Đã tất toán",
  },
  {
    id: 3,
    name: "Lê Văn C",
    phone: "0934567890",
    debt: 20000000,
    status: "Quá hạn",
  },
];

export default function CustomerPage() {
  const form = {
    name: '',
    email: '',
    posittion: '',
    status: ''
  };
  const PAGE_DEFAULT = 1;
  const LIMIT = 10;

  const [search, setSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [formSearch, setFormSearch] = useState(form);
  const [page, setPage] = useState(PAGE_DEFAULT);
  const [limit, setLimit] = useState(LIMIT);
  const [total, setTotal] = useState(0);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const getAllData = async () => {
    try {
      const response = await baseApi.get("/customers");
      console.log("response: ", response);
      setCustomers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  const handleChangeFormSearch = (e) => {
    const { name, value } = e.target;
    setFormSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormSearch(form);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý khách hàng</h2>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition w-[11rem] mr-[10px]">
            Xuất excel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition w-[11rem]"
            onClick={() => setIsOpenModal(true)}
          >
            + Thêm khách hàng
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        <div className="text-[20px] font-bold">Thông tin tìm kiếm</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Nhập tên sách */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Tên khách hàng
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                name="name"
                placeholder="Nhập tên khách hàng"
                value={formSearch.name || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Nhập Tác giả */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                name="email"
                placeholder="Nhập email"
                value={formSearch.email || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Chọn loại sách */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Loại sách
            </label>
            <select
              name="status"
              value={formSearch.status ?? ""}
              onChange={handleChangeFormSearch}
              placeholder="Chọn loại sách"
              className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all"
            >
              <option value=""></option>
              <option value="true">Hoạt động</option>
              <option value="false">Khóa</option>
            </select>
          </div>
        </div>

        {/* Nút tìm kiếm */}
        <div className="flex justify-end">
          <button
            onClick={() => resetForm()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <div className="flex align-anchor">
              <Eraser size={20}/>
              <span className="ml-[5px]">Làm mới</span>
            </div>
          </button>

          <button
            onClick={() => {
              setPage(1);
              getAllData();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-3"
          >
            <div className="flex align-anchor">
              <Search size={20}/>
              <span className="ml-[5px]">Tìm kiếm</span>
            </div>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="p-3 ">STT</th>
              <th className="p-3">Tên khách hàng</th>
              <th className="p-3">SĐT</th>
              <th className="p-3">Dư nợ</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, index) => (
              <tr key={c.id} className="border-t hover:bg-gray-50 text-center">
                <td className="p-3 font-medium">{index + 1}</td>
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3">{c.phone}</td>
                <td className="p-3">₫ {c.debt.toLocaleString()}</td>
                <td className="p-3">
                  {c.status === "Đang vay" && (
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                      {c.status}
                    </span>
                  )}
                  {c.status === "Đã tất toán" && (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                      {c.status}
                    </span>
                  )}
                  {c.status === "Quá hạn" && (
                    <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                      {c.status}
                    </span>
                  )}
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-800">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Không tìm thấy khách hàng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (demo tĩnh) */}
      <div className="flex justify-end gap-2">
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Trước
        </button>
        <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          2
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Sau
        </button>
      </div>

      {/* Modal add data */}
      {/* {isOpenModal && (
        <CreateData
          onClose={() => setIsOpenModal(false)}
        />
      )} */}

      {isOpenModalDelete && (
        <DeleteConfirm
          onClose={() => setIsOpenModalDelete(false)}
        />
      )}
    </div>
  );
}
