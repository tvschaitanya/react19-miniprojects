const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  errors = {},
}) => {
  // Determine if there's an error for this specific input
  const hasError = errors[name];

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-semibold mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
          hasError ? "border-red-500" : "focus:ring-purple-500"
        }`}
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && <p className="text-red-500 text-sm mt-1">{hasError}</p>}
    </div>
  );
};

export default SelectInput;
