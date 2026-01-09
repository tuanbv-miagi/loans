import React, { useState } from "react";
import { Search, Edit, Trash2, Eye, Eraser, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog";
import baseApi from "../../api/baseApi";
import SlideAlert from "../../components/SlideAlert";
import { useEffect } from "react";
import { formatDateTime } from "../../utils/DateFormat";
import Paginate from "../../components/paginate";

export default function LoanPage() {
  const form = {
    customerName: "",
    startDate: "",
    endDate: "",
    status: "",
    amount: "",
  };
  const PAGE_DEFAULT = 1;
  const LIMIT = 10;
  const navigate = useNavigate();
  // const [search, setSearch] = useState("");
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [formSearch, setFormSearch] = useState(form);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(PAGE_DEFAULT);
  const [limit, setLimit] = useState(LIMIT);
  const [total, setTotal] = useState(0);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertId, setAlertId] = useState("");
  const [loanId, setLoanId] = useState(null);

  const handleChangeFormSearch = (e) => {
    const { name, value } = e.target;
    setFormSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await baseApi.delete(`/loans/delete/${loanId}`);
      if (response?.status === 200) {
        await getAllData();
        setIsOpenModalDelete(false);
      }
      setIsOpenAlert(true);
      setAlertId("loan_delete");
      setAlertMsg(response.message);
      setAlertType(response?.status === 200 ? "success" : "error");
    } catch (error) {
      setIsOpenAlert(true);
      setAlertId("loan_delete");
      setAlertMsg(
        error?.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau"
      );
      setAlertType("error");
    } finally {
      setLoanId(null);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormSearch(form);
    getAllData(form);
  };

  const getAllData = async (search = formSearch) => {
    const params = {
      page: page,
      limit: limit,
      paramSearch: search,
    };
    try {
      setLoading(true);
      const response = await baseApi.post("/loans/paginate", params);
      response.data = response?.data.map((item, index) => ({
        ...item,
        no: (page - 1) * limit + index + 1,
      }));
      setLoans(response.data);
      setTotal(response.pagination.total);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setIsOpenAlert(true);
      setAlertId("loans_get_list");
      setAlertMsg(
        error?.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau"
      );
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  const redirectDetail = (id) => {
    navigate(`/loans/${id}`);
  };

  const redirectEdit = (id) => {
    navigate(`/loans/${id}/edit`);
  };

  const redirectCreate = () => {
    navigate("/loans/create");
  };

  useEffect(() => {
    getAllData();
  }, []);

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
        <h2 className="text-2xl font-bold">Quản lý khoản vay</h2>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition w-[11rem] mr-[10px]">
            Xuất excel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition w-[11rem]"
            onClick={() => redirectCreate()}
          >
            + Thêm khoản vay
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
                name="customerName"
                placeholder="Nhập tên khách hàng"
                value={formSearch.customerName || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Nhập số tiền */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">Số tiền</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                name="amount"
                placeholder="Nhập số tiền"
                value={formSearch.amount || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Chọn từ ngày */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">Từ ngày</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="date"
                name="startDate"
                value={formSearch.startDate || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Chọn đến ngày */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Đến ngày
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="date"
                name="endDate"
                value={formSearch.endDate || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
          {/* Chọn trạng thái */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Trạng thái
            </label>
            <select
              name="status"
              value={formSearch.status ?? ""}
              onChange={handleChangeFormSearch}
              placeholder="Chọn trạng thái"
              className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all"
            >
              <option value=""></option>
              <option value="0">Đang thanh toán</option>
              <option value="1">Đã trả</option>
              <option value="2">Trễ hạn</option>
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
              <Eraser size={20} />
              <span className="ml-[5px]">Làm mới</span>
            </div>
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-3"
            onClick={() => {
              setPage(1);
              getAllData();
            }}
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
              <th className="p-3">STT</th>
              <th className="p-3">Khách hàng</th>
              <th className="p-3">Số tiền vay</th>
              <th className="p-3">Lãi suất</th>
              <th className="p-3">Ngày vay</th>
              <th className="p-3">Ngày đến hạn</th>
              <th className="p-3">Trạng thái</th>
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
            ) : loans.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center text-gray-500 py-8">
                  Không có dữ liệu.
                </td>
              </tr>
            ) : (
              loans.map((loan, index) => (
                <tr key={loan.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{loan.no}</td>
                  <td className="p-3 font-medium">
                    {loan?.customer?.lastName + " " + loan?.customer?.firstName}
                  </td>
                  <td className="p-3">₫ {loan.amount.toLocaleString()}</td>
                  <td className="p-3">{loan.interestRate}%</td>
                  <td className="p-3">
                    {formatDateTime(loan.startDate, "YYYY/MM/DD")}
                  </td>
                  <td className="p-3">
                    {formatDateTime(loan.dueDate, "YYYY/MM/DD")}
                  </td>
                  <td className="p-3">
                    {loan.status == "0" && (
                      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                        Đang thanh toán
                      </span>
                    )}
                    {loan.status == "1" && (
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                        Đã trả
                      </span>
                    )}
                    {loan.status == "2" && (
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                        Trễ hạn
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => redirectDetail(loan.id)}
                    >
                      <Eye size={18} />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-800"
                      onClick={() => redirectEdit(loan.id)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => (
                        setIsOpenModalDelete(true), setLoanId(loan.id)
                      )}
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
        title="Xác nhận xoá thông tin khoản vay?"
        message="Bạn có chắc muốn xoá mục này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleDelete}
        onCancel={() => setIsOpenModalDelete(false)}
      />
    </div>
  );
}
