export default function _InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  readOnly = false,
  maxLength,
  errorMessage,
}) {
  return (
    <div>
      <label className="font-medium">
        {label}
        <span className="text-[red]"> *</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        maxLength={maxLength}
        className={`w-full mt-1 border rounded-lg px-3 py-2 ${
          readOnly ? "bg-gray-100" : "focus:ring-2 focus:ring-blue-400"
        }`}
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
