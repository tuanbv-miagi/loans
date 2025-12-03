export default function _SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="font-medium">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-400"
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
