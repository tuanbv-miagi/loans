import React, { useEffect, useState } from "react";
import { Search, Edit, Trash2, Eye, RotateCcw, Eraser, Loader2 } from "lucide-react";
import baseApi from "../../api/baseApi";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog";
import Paginate from "../../components/paginate";
import SlideAlert from "../../components/SlideAlert";

export default function CustomerPage() {
  const form = {
    name: '',
    email: '',
    phone: '',
    nationalId: '',
    isSpamZalo: '',
    isSpamIcloud: '',
  };
  const PAGE_DEFAULT = 1;
  const LIMIT = 10;
  const navigate = useNavigate();

  // const [search, setSearch] = useState("");
  // const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [formSearch, setFormSearch] = useState(form);
  const [page, setPage] = useState(PAGE_DEFAULT);
  const [limit, setLimit] = useState(LIMIT);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertId, setAlertId] = useState("");

  const getAllData = async (search = formSearch) => {
    const params = {
      page: page,
      limit: limit,
      paramSearch: search,
    };
    try {
      setLoading(true);
      const response = await baseApi.post("/customers/paginate", params);
      response.data = response?.data.map((item, index) => ({
        ...item,
        no: (page - 1) * limit + index + 1,
      }));
      setCustomers(response.data);
      setTotal(response.pagination.total);
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

  const redirectCreatePage = () => {
    navigate("/customers/create")
  }

  const redirectDetail = (id) => {
    navigate(`/customers/${id}`)
  }

  const handleDelete = () => {
    // TODO handle logic delete
  }

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
        <h2 className="text-2xl font-bold">Quản lý khách hàng</h2>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition w-[11rem] mr-[10px]">
            Xuất excel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition w-[11rem]"
            onClick={() => redirectCreatePage()}
          >
            + Thêm khách hàng
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        <div className="text-[20px] font-bold">Thông tin tìm kiếm</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Nhập tên khách hàng */}
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

          {/* Nhập email */}
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

          {/* Nhập số điện thoại */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Số điện thoại
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={formSearch.phone || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Nhập số căn cước */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Số căn cước
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                name="nationalId"
                placeholder="Nhập số căn cước"
                value={formSearch.nationalId || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Spam zalo */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Spam zalo
            </label>
            <select
              name="isSpamZalo"
              value={formSearch.isSpamZalo ?? ""}
              onChange={handleChangeFormSearch}
              placeholder="Chọn trạng thái"
              className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all"
            >
              <option value=""></option>
              <option value="0">Không spam</option>
              <option value="1">Spam</option>
            </select>
          </div>

          {/* Spam icloud */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Spam icloud
            </label>
            <select
              name="isSpamIcloud"
              value={formSearch.isSpamIcloud ?? ""}
              onChange={handleChangeFormSearch}
              placeholder="Chọn trạng thái"
              className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all"
            >
              <option value=""></option>
              <option value="0">Không spam</option>
              <option value="1">Spam</option>
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
              <th className="p-3">CCCD</th>
              <th className="p-3">SĐT</th>
              <th className="p-3">Email</th>
              <th className="p-3">Spam zalo</th>
              <th className="p-3">Spam icloud</th>
              <th className="p-3 text-center">Hành động</th>
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
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center text-gray-500 py-8">
                  Không có dữ liệu.
                </td>
              </tr>
            ) : (
              customers.map((customer, index) => (
                <tr key={customer.id} className="border-t hover:bg-gray-50 text-center">
                  <td className="p-3 font-medium">{index + 1}</td>
                  <td className="p-3 font-medium">{customer.lastName + " " + customer.firstName}</td>
                  <td className="p-3">{customer.nationalId}</td>
                  <td className="p-3">{customer.phone}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">
                    {customer.isSpamZalo === 0 && (
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                        Không spam
                      </span>
                    )}
                    {customer.isSpamZalo === 1 && (
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                        Spam
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {customer.isSpamIcloud === 0 && (
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                        Không spam
                      </span>
                    )}
                    {customer.isSpamIcloud === 1 && (
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                        Spam
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800"
                      onClick={() => redirectDetail(1)}
                    >
                      <Eye size={18} />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-800">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800"
                      onClick={() => setIsOpenModalDelete(true)}
                    >
                      <Trash2 size={18} />
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

      <ConfirmDialog
        open={isOpenModalDelete}
        title="Xác nhận xoá thông tin khách hàng?"
        message="Bạn có chắc muốn xoá mục này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleDelete}
        onCancel={() => setIsOpenModalDelete(false)}
      />
    </div>
  );
}
