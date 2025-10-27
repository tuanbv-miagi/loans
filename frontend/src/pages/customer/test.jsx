import React, { useEffect, useState } from "react";
import { Search, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import CreateData from "./create";
import ImportForm from "./import-form";
import baseApi from "../../api/baseApi";
import ModalConfirmDelete from "./modal-delete-confirm";
import Paginate from "../../components/paginate";

export default function AudioBookPage() {
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalImport, setIsOpenModalImport] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [audioBooks, setAudioBooks] = useState([]);
  const [audioBookId, setAudioBookId] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const PAGE_DEFAULT = 1;
  const LIMIT = 10;
  const [page, setPage] = useState(PAGE_DEFAULT);
  const [limit, setLimit] = useState(LIMIT);
  const [total, setTotal] = useState(0);
  const [formSearch, setFormSearch] = useState({
    title: "",
    narrator: "",
    releaseYear: "",
    language: "",
    isAudioBook: ""
  })

  const getAllData = async () => {
    const params = {
      page,
      limit,
      paramSearch: formSearch
    }
    try {
      setLoading(true);
      const response = await baseApi.post("/audio-books", params);
      response.data = response.data .map((item, index) => ({
        ...item,
        no: (page - 1) * limit + index + 1,
      }));
      setTotal(response.totalPages);
      setAudioBooks(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeFormSearch = (e) => {
    const { name, value } = e.target;
    setFormSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getAllData();
  }, [page]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = audioBooks.map((a) => a.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const reset = () => {
    const params = {
      title: "",
      narrator: "",
      releaseYear: "",
      language: "",
      isAudioBook: ""
    }
    setFormSearch(params)
    setPage(PAGE_DEFAULT);
    getAllData(params);
  }

  const isAllSelected =
    audioBooks.length > 0 && audioBooks.every((a) => selectedIds.includes(a.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý sách nói</h2>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition w-[11rem] mr-[10px]"
            onClick={() => setIsOpenModalImport(true)}
          >
            Tải file
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition w-[11rem]"
            onClick={() => setIsOpenModal(true)}
          >
            + Thêm mới sách
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Nhập tên sách */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Tiêu đề
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                name="title"
                placeholder="Nhập tiêu đề sách"
                value={formSearch.title || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Nhập Tác giả */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Tác giả
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="text"
                name="narrator"
                placeholder="Nhập tên tác giả"
                value={formSearch.narrator || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Nhập năm xuất bản */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Năm sản xuất
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <input
                type="number"
                name="releaseYear"
                placeholder="Nhập năm sản xuất"
                value={formSearch.releaseYear || ""}
                onChange={handleChangeFormSearch}
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Chọn ngôn ngữ */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Ngôn ngữ
            </label>
            <select
              name="language"
              value={formSearch.language || ""}
              onChange={handleChangeFormSearch}
              placeholder="Chọn ngôn ngữ"
              className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all"
            >
              <option value=""></option>
              <option value="vi">Tiếng Việt</option>
              <option value="en">Tiếng Anh</option>
            </select>
          </div>

          {/* Chọn loại sách */}
          <div className="flex flex-col space-y-1">
            <label className="font-medium text-gray-700 text-sm">
              Loại sách
            </label>
            <select
              name="isAudioBook"
              value={formSearch.isAudioBook ?? ""}
              onChange={handleChangeFormSearch}
              placeholder="Chọn loại sách"
              className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all"
            >
              <option value=""></option>
              <option value="true">Sách nói</option>
              <option value="false">Sách viết</option>
            </select>
          </div>
        </div>

        {/* Nút tìm kiếm */}
        <div className="flex justify-end">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Dọn dẹp
          </button>

          <button
            onClick={() => {
              setPage(1);
              getAllData();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-3"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-3">STT</th>
              <th className="p-3">Tiêu đề</th>
              <th className="p-3">Số chương</th>
              <th className="p-3">Tác giả</th>
              <th className="p-3">Ngôn ngữ</th>
              <th className="p-3">Năm xuất bản</th>
              <th className="p-3">Loại sách</th>
              <th className="p-3">Thời lượng</th>
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
            ) : audioBooks.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center text-gray-500 py-8">
                  Không có dữ liệu.
                </td>
              </tr>
            ) : (
              audioBooks.map((audioBook) => (
                <tr
                  key={audioBook.id}
                  className={`border-t hover:bg-gray-50 ${
                    selectedIds.includes(audioBook.id)
                      ? "bg-blue-50"
                      : "bg-white"
                  }`}
                >
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(audioBook.id)}
                      onChange={() => handleSelectOne(audioBook.id)}
                    />
                  </td>
                  <td className="p-3">{audioBook.no}</td>
                  <td className="p-3 font-medium">{audioBook.title}</td>
                  <td className="p-3">{audioBook.chaptersCount}</td>
                  <td className="p-3">{audioBook.narrator}</td>
                  <td className="p-3">
                    {audioBook.language === "vi" ? "Tiếng Việt" : "Tiếng Anh"}
                  </td>
                  <td className="p-3">{audioBook.releaseYear}</td>
                  <td className="p-3">
                    {audioBook.isAudioBook ? (
                      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                        Sách nói
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                        Sách viết
                      </span>
                    )}
                  </td>
                  <td className="p-3">{audioBook.totalDuration ?? 0} phút</td>
                  <td className="p-3 flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-800">
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => {
                        setIsOpenModalDelete(true);
                        setAudioBookId(audioBook.id);
                      }}
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

      <Paginate
        setPage={setPage}
        page={page}
        total={total}
        setLimit={setLimit}
        limit={limit}
        getList={getAllData}
      />

      {/* Modal add data */}
      {isOpenModal && (
        <CreateData
          onClose={() => setIsOpenModal(false)}
          getList={getAllData}
          setLoading={setLoading}
        />
      )}

      {/* Modal import data */}
      {isOpenModalImport && (
        <ImportForm
          onClose={() => setIsOpenModalImport(false)}
          getList={getAllData}
          setLoading={setLoading}
        />
      )}

      {/* Modal delete data */}
      {isOpenModalDelete && (
        <ModalConfirmDelete
          onClose={() => setIsOpenModalDelete(false)}
          getList={getAllData}
          id={audioBookId}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}
