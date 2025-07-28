import React from "react";

const TextInput = ({
  label,
  name,
  value,
  onChange,
  required = false,
  errors = {},
  type = "text", // Now flexible
  placeholder,
}) => {
  // Determine if there's an error for this specific input
  const hasError = errors[name];

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-semibold mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
          hasError ? "border-red-500" : "focus:ring-purple-500"
        }`}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      />
      {hasError && <p className="text-red-500 text-sm mt-1">{hasError}</p>}
    </div>
  );
};

export default TextInput;
