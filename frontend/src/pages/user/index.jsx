import React, { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  UserPlus,
  Lock,
  Loader2,
  Eraser,
  Unlock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateUserPage from "./create.jsx";
import Contants from "../../utils/Contants.jsx";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";
import baseApi from "../../api/baseApi.js";
import Paginate from "../../components/paginate.jsx";
import { formatDateTime } from "../../utils/DateFormat.jsx";
import SlideAlert from "../../components/SlideAlert.jsx";
import { useEffect } from "react";

export default function UserPage() {
  const textScreens = {
    no: "STT",
    fullName: "Họ và tên",
    userName: "Tên đăng nhập",
    email: "Email",
    role: "Vai trò",
    status: "Trạng thái",
    createdAt: "Ngày tạo",
    updatedAt: "Ngày cập nhật",
    actions: "Hành động",
    lastLogin: "Đăng nhập lần cuối",
  };

  const navigate = useNavigate();
  const PAGE_DEFAULT = 1;
  const LIMIT = 10;
  const [page, setPage] = useState(PAGE_DEFAULT);
  const [limit, setLimit] = useState(LIMIT);
  const [total, setTotal] = useState(0);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDeleteConfirm, setIsOpenModalDeleteConfirm] =
    useState(false);
  const [isOpenModalLockConfirm, setIsOpenModalLockConfirm] = useState(false);
  const [isOpenModalUnLockConfirm, setIsOpenModalUnLockConfirm] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertId, setAlertId] = useState("");
  const [userId, setUserId] = useState(null);
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
      page: page,
      limit: limit,
      paramSearch: search,
    };
    try {
      setLoading(true);
      const response = await baseApi.post("/users/paginate", params);
      response.data = response?.data.map((item, index) => ({
        ...item,
        no: (page - 1) * limit + index + 1,
      }));
      setTotal(response.pagination?.totalPages);
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setIsOpenAlert(true);
      setAlertId("user_get_list");
      setAlertMsg(
        error?.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau"
      );
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async () => {
    try {
      setLoading(true);
      const response = await baseApi.delete(`/users/delete/${userId}`);
      if (response?.status === 200) {
        await getAllData();
        setIsOpenModalDeleteConfirm(false);
      }
      setIsOpenAlert(true);
      setAlertId("user_delete");
      setAlertMsg(response.message);
      setAlertType(response?.status === 200 ? "success" : "error");
    } catch (error) {
      setIsOpenAlert(true);
      setAlertId("user_delete");
      setAlertMsg(
        error?.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau"
      );
      setAlertType("error");
    } finally {
      setUserId(null);
      setLoading(false);
    }
  };

  const lockData = async () => {
    try {
      setLoading(true);
      const response = await baseApi.put(`/users/lock/${userId}`);
      if (response?.status === 200) {
        await getAllData();
        setIsOpenModalLockConfirm(false);
      }
      setIsOpenAlert(true);
      setAlertId("user_lock");
      setAlertMsg(response.message);
      setAlertType(response?.status === 200 ? "success" : "error");
    } catch (error) {
      setIsOpenAlert(true);
      setAlertId("user_lock");
      setAlertMsg(
        error?.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau"
      );
      setAlertType("error");
    } finally {
      setUserId(null);
      setLoading(false);
    }
  };

  const unLockData = async () => {
    try {
      setLoading(true);
      const response = await baseApi.put(`/users/unlock/${userId}`);
      if (response?.status === 200) {
        await getAllData();
        setIsOpenModalUnLockConfirm(false);
      }
      setIsOpenAlert(true);
      setAlertId("user_unlock");
      setAlertMsg(response.message);
      setAlertType(response?.status === 200 ? "success" : "error");
    } catch (error) {
      setIsOpenAlert(true);
      setAlertId("user_unlock");
      setAlertMsg(
        error?.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau"
      );
      setAlertType("error");
    } finally {
      setUserId(null);
      setLoading(false);
    }
  };

  const clearFormSearch = () => {
    setFormSearch({
      userName: "",
      email: "",
      role: "",
      status: "",
    });
    setPage(PAGE_DEFAULT);
  };

  useEffect(() => {
    getAllData();
  }, [page, limit]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div className="space-y-6">
      <SlideAlert
        open={isOpenAlert}
        onClose={() => setIsOpenAlert(false)}
        type={alertType}
        message={alertMsg}
        alertId={alertId}
      />
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
              <Eraser size={20} />
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
              <Search size={20} />
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
              <th className="p-3">{textScreens.lastLogin}</th>
              <th className="p-3">{textScreens.createdAt}</th>
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
              users.map((user, _) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{user.no}</td>
                  <td className="p-3 font-medium">{user.userName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    {user.role === 1 ? "Quản trị viên" : "Người dùng"}
                  </td>
                  <td className="p-3">
                    {user.status === 0 ? (
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                        Hoạt động
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                        Khóa
                      </span>
                    )}
                  </td>
                  <td className="p-3">{formatDateTime(user.lastLogin)}</td>
                  <td className="p-3">{formatDateTime(user.createdAt)}</td>
                  <td className="p-3 flex justify-center gap-3">
                    <button className="text-yellow-600 hover:text-yellow-800">
                      <Edit size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      {user.status === 0 ? (
                        <Lock
                          size={18}
                          onClick={() => (
                            setIsOpenModalLockConfirm(true), setUserId(user.id)
                          )}
                        />
                      ) : (
                        <Unlock
                          size={18}
                          onClick={() => (
                            setIsOpenModalUnLockConfirm(true),
                            setUserId(user.id)
                          )}
                        />
                      )}
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2
                        size={18}
                        onClick={() => (
                          setIsOpenModalDeleteConfirm(true), setUserId(user.id)
                        )}
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
          getAllData={getAllData}
        />
      )}

      <ConfirmDialog
        open={isOpenModalDeleteConfirm}
        title="Xác nhận xoá thông tin người dùng?"
        message="Bạn có chắc muốn xoá mục này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={deleteData}
        onCancel={() => setIsOpenModalDeleteConfirm(false)}
      />

      <ConfirmDialog
        open={isOpenModalLockConfirm}
        title="Xác nhận khóa thông tin người dùng?"
        message="Bạn có chắc muốn khóa mục này?"
        confirmText="khóa"
        cancelText="Hủy"
        onConfirm={lockData}
        onCancel={() => setIsOpenModalLockConfirm(false)}
      />

      <ConfirmDialog
        open={isOpenModalUnLockConfirm}
        title="Xác nhận mở khóa thông tin người dùng?"
        message="Bạn có chắc muốn mở khóa mục này?"
        confirmText="Mở khóa"
        cancelText="Hủy"
        onConfirm={unLockData}
        onCancel={() => setIsOpenModalUnLockConfirm(false)}
      />
    </div>
  );
}
