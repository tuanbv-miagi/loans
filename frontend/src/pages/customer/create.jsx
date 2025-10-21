import React, { useState } from "react";
import { Validator } from "../../utils/Validator";
import baseApi from "../../api/baseApi";

export default function CreateData({ onClose }) {
  const formInput = {
    title: "",
    chaptersCount: "",
    cover: "",
    description: "",
    isAudioBook: "audio",
    language: "vi",
    narrator: "",
    releaseYear: "",
    totalDuration: ""
  };

  const labelTextScreen = {
    title: 'Tiêu đề',
    chaptersCount: 'Số chương',
    cover: 'Ảnh bìa',
    description: 'Mô tả',
    releaseYear: 'Năm xuất bản',
    totalDuration: 'Tổng thời lượng',
    isAudioBook: 'Loại Sách',
    language: 'Ngôn ngữ',
    narrator: 'Giọng đọc'
  }

  const [formData, setFormData] = useState(formInput);
  const [previewURL, setPreviewURL] = useState("");
  const [errors, setErrors] = useState({});

  const handlePrivewImage = (e) => {
    const { files } = e.target;
    const file = files[0];
    if (file) {
      const previewImage = URL.createObjectURL(file);
      setPreviewURL(previewImage);
    }
  }

  const handleChangeForm = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const closeModal = () => {
    setPreviewURL("");
    setFormData(formInput);
    onClose();
  }

  const validateForm = () => {
    const messageErrors = {};

    messageErrors.title =
      Validator.require(formData.title, labelTextScreen.title) ||
      Validator.max(formData.title, 255, labelTextScreen.title);

    messageErrors.chaptersCount =
      Validator.require(formData.chaptersCount, labelTextScreen.chaptersCount) ||
      Validator.isNumber(formData.chaptersCount, labelTextScreen.chaptersCount);

    // messageErrors.cover = Validator.require(formData.cover, labelTextScreen.cover);

    if (formData.narrator) {
      messageErrors.narrator = Validator.max(formData.narrator, labelTextScreen.narrator);
    }

    if (formData.releaseYear) {
      messageErrors.releaseYear = Validator.isNumber(formData.releaseYear, labelTextScreen.releaseYear);
    }

    if (formData.totalDuration) {
      messageErrors.totalDuration = Validator.isNumber(formData.totalDuration, labelTextScreen.totalDuration);
    }

    if (formData.description) {
      messageErrors.description = Validator.max(formData.description, labelTextScreen.description);
    }

    const filteredErrors = Object.fromEntries(
      Object.entries(messageErrors).filter(([_, v]) => v)
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    if (!validateForm()) return;

    try {
      await baseApi.post("/audio-books/create", formData);
      onClose();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[1000px]">
        <div className="relative">
          <button
            onClick={() => closeModal()}
            className="absolute top-1 right-3 text-gray-500 hover:text-gray-800 text-2xl leading-none"
          >
            &times;
          </button>
          <h3 className="text-xl font-semibold mb-4 text-center">
            Thêm mới sách nói
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-[4%] w-full">
            <div>
              <div className="mb-[10px]">
                <label className="block text-sm font-medium mb-1">{labelTextScreen.title}</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChangeForm}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                  placeholder="Nhập tiêu đề"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>

              <div className="mb-[10px]">
                <label className="block text-sm font-medium mb-1">{labelTextScreen.narrator}</label>
                <input
                  type="text"
                  name="narrator"
                  value={formData.narrator}
                  onChange={handleChangeForm}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                  placeholder="Nhập giọng đọc"
                />
                {errors.narrator && <p className="text-red-500 text-sm">{errors.narrator}</p>}
              </div>

              <div className="mb-[10px]">
                <label className="block text-sm font-medium mb-1">{labelTextScreen.cover}</label>
                <input
                  type="file"
                  name="cover"
                  accept="image/*"
                  onChange={handlePrivewImage}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                />
                {errors.cover && <p className="text-red-500 text-sm">{errors.cover}</p>}
                <div className="mt-3 flex justify-center items-center h-32 border rounded-lg bg-gray-100 shadow overflow-hidden">
                  <img
                    src={previewURL}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="mb-[10px]">
                <label className="block text-sm font-medium mb-1">{labelTextScreen.chaptersCount}</label>
                <input
                  type="text"
                  name="chaptersCount"
                  value={formData.chaptersCount}
                  onChange={handleChangeForm}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                  placeholder="Nhập số chương"
                />
                {errors.chaptersCount && <p className="text-red-500 text-sm">{errors.chaptersCount}</p>}
              </div>

              <div className="mb-[10px]">
                <label className="block text-sm font-medium mb-1">{labelTextScreen.releaseYear}</label>
                <input
                  type="text"
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleChangeForm}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                  placeholder="Nhập năm xuất bản"
                />
                {errors.releaseYear && <p className="text-red-500 text-sm">{errors.releaseYear}</p>}
              </div>

              <div className="mb-[10px]">
                <label className="block text-sm font-medium mb-1">{labelTextScreen.totalDuration}</label>
                <input
                  type="text"
                  name="totalDuration"
                  value={formData.totalDuration}
                  onChange={handleChangeForm}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                  placeholder="Nhập tổng thời lượng"
                />
                {errors.totalDuration && <p className="text-red-500 text-sm">{errors.totalDuration}</p>}
              </div>

              <div className="mb-[10px]">
                <label className="block text-sm font-medium mb-2">{labelTextScreen.language}</label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="language"
                      value="vi"
                      checked={formData.language === "vi"}
                      onChange={handleChangeForm}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Tiếng việt</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="language"
                      value="en"
                      checked={formData.language === "en"}
                      onChange={handleChangeForm}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Tiếng anh</span>
                  </label>
                </div>
              </div>

              <div className="mb-[10px]">
                <label className="block text-sm font-medium mb-2">{labelTextScreen.isAudioBook}</label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="isAudioBook"
                      value="paper"
                      checked={formData.isAudioBook === "paper"}
                      onChange={handleChangeForm}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Sách giấy</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="isAudioBook"
                      value="audio"
                      checked={formData.isAudioBook === "audio"}
                      onChange={handleChangeForm}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Sách nói</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{labelTextScreen.description}</label>
            <textarea
              type="text"
              name="description"
              rows={8}
              value={formData.description}
              onChange={handleChangeForm}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
              placeholder="Nhập mô tả"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => closeModal()}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
