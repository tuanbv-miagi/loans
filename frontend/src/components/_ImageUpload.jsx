export default function _ImageUpload({
  imageFiles,
  setImageFiles,
  imagePreview,
  setImagePreview,
}) {
  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    if (imageFiles.length + files.length > 10) {
      alert("Tối đa 10 ảnh!");
      return;
    }
    const previews = files.map((file) => URL.createObjectURL(file));
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreview((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 border-l-4 border-green-600 pl-3">
        Upload ảnh (Tối đa 10 ảnh)
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Ô + để chọn ảnh */}
        {imageFiles.length < 10 && (
          <label className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg h-32 cursor-pointer hover:border-blue-500 transition relative group">
            <input
              type="file"
              multiple
              accept="image/*"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              onChange={handleAddImages}
            />
            <span className="text-4xl text-gray-400 group-hover:text-blue-500">
              +
            </span>
          </label>
        )}

        {/* Preview ảnh */}
        {imagePreview.map((src, idx) => (
          <div key={idx} className="relative group">
            <img
              src={src}
              alt="preview"
              className="w-full h-32 object-cover rounded-lg shadow"
            />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
