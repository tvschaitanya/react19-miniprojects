const TextAreaInput = ({
  label,
  name,
  value,
  onChange,
  required = false,
  errors = {},
  rows = 4,
  placeholder,
}) => {
  // Determine if there's an error for this specific input
  const hasError = errors[name];

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-semibold mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 resize-vertical ${
          hasError ? "border-red-500" : "focus:ring-purple-500"
        }`}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        required={required}
      />
      {hasError && <p className="text-red-500 text-sm mt-1">{hasError}</p>}
    </div>
  );
};

export default TextAreaInput;
