import React, { useState } from "react";
import { Search, Edit, Trash2, Eye, UserPlus, Lock, Loader2, Eraser } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateUserPage from "./create.jsx";
import Paginate from "../../components/paginate";
import Contants from "../../utils/Contants.jsx";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";

const users = [
  {
    id: 1,
    name: "Nguyễn Văn Admin",
    email: "admin@example.com",
    role: "Admin",
    status: "Hoạt động",
  },
  {
    id: 2,
    name: "Trần Thị Nhân Viên",
    email: "staff@example.com",
    role: "Nhân viên",
    status: "Khóa",
  },
  {
    id: 3,
    name: "Lê Văn Kế Toán",
    email: "accountant@example.com",
    role: "Kế toán",
    status: "Hoạt động",
  },
];

export default function UserPage() {
  const textScreens = {
    no: "STT",
    userName: "Họ tên",
    email: "Email",
    role: "Vai trò",
    status: "Trạng thái",
    createdAt: "Ngày tạo",
    updatedAt: "Ngày cập nhật",
    actions: "Hành động",
  };

  const navigate = useNavigate();
  const PAGE_DEFAULT = 1;
  const LIMIT = 10;
  const [page, setPage] = useState(PAGE_DEFAULT);
  const [limit, setLimit] = useState(LIMIT);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDeleteConfirm, setIsOpenModalDeleteConfirm] = useState(false);
  const [isOpenModalLockConfirm, setIsOpenModalLockConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [users, setUsers] = useState([]);
  const [formSearch, setFormSearch] = useState({
    userName: "",
    email: "",
    role: "",
    status: "",
  });


    const handleChangeFormSearch = (e) => {
    const { name, value } = e.target;
    setFormSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAllData = async (search = formSearch) => {
    const params = {
      page,
      limit,
      paramSearch: search
    }
    try {
      setLoading(true);
      // const response = await baseApi.post("/audio-books", params);
      // response.data = response.data.map((item, index) => ({
      //   ...item,
      //   no: (page - 1) * limit + index + 1,
      // }));
      // setTotal(response.totalPages);
      // setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  }

  const deleteData = async (id) => {
    try {
      setLoading(true);
      // TODO handle logic delete
      setIsOpenModalDeleteConfirm(false);
    } catch (error) {
      console.log(error);
    }
  }

  const lockData = async (id) => {
    try {
      setLoading(true);
      // TODO handle logic delete
      setIsOpenModalLockConfirm(false);
    } catch (error) {
      console.log(error);
    }
  }

  const clearFormSearch = () => {
    setFormSearch({
      userName: "",
      email: "",
      role: "",
      status: "",
    });
    setPage(PAGE_DEFAULT);
  };

  useState(() => {
    // getAllData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          onClick={() => setIsOpenModalCreate(true)}
        >
          <UserPlus size={18} />
          Thêm người dùng
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        <div className="text-[20px] font-bold">Thông tin tìm kiếm</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Nhập tên đăng nhập */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              {textScreens.userName}
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                name="userName"
                placeholder="Nhập tên đăng nhập"
                value={formSearch.userName || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Nhập email */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              {textScreens.email}
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

          {/* Chọn loại vai trò */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              {textScreens.role}
            </label>
            <select
              name="role"
              value={formSearch.role ?? ""}
              onChange={handleChangeFormSearch}
              placeholder="Chọn loại vai trò"
              className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all"
            >
              <option value=""></option>
                {Contants.roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
            </select>
          </div>

          {/* Chọn loại vai trò */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              {textScreens.status}
            </label>
            <select
              name="status"
              value={formSearch.status ?? ""}
              onChange={handleChangeFormSearch}
              placeholder="Chọn trạng thái"
              className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all"
            >
              <option value=""></option>
                {Contants.userStatus.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Nút tìm kiếm */}
        <div className="flex justify-end">
          <button
            onClick={() => clearFormSearch()}
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
            <tr className="bg-gray-100">
              <th className="p-3">{textScreens.no}</th>
              <th className="p-3">{textScreens.userName}</th>
              <th className="p-3">{textScreens.email}</th>
              <th className="p-3">{textScreens.role}</th>
              <th className="p-3">{textScreens.status}</th>
              <th className="p-3 text-center">{textScreens.actions}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="text-center py-16">
                  <div className="flex flex-col justify-center items-center text-gray-500">
                    <Loader2 className="animate-spin w-8 h-8 mb-3 text-blue-500" />
                    <span>Đang tải dữ liệu...</span>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center text-gray-500 py-8">
                  Không có dữ liệu.
                </td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">
                    {u.status === "Hoạt động" ? (
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                        Hoạt động
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                        Khóa
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
                      <Trash2 size={18} onClick={() => setIsOpenModalDeleteConfirm(true)}/>
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Lock size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (demo) */}
      <Paginate
        setPage={setPage}
        page={page}
        total={total}
        setLimit={setLimit}
        limit={limit}
        getList={getAllData}
      />

      {isOpenModalCreate && (
        <CreateUserPage
          onClose={() => setIsOpenModalCreate(false)}
          setLoading={setLoading}
        />
      )}

      <ConfirmDialog
        open={isOpenModalDeleteConfirm}
        title="Xác nhận xoá?"
        message="Bạn có chắc muốn xoá mục này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={deleteData}
        onCancel={() => setIsOpenModalDeleteConfirm(false)}
      />
    </div>
  );
}
