import { useState } from "react";
import TextInput from "./Inputs/TextInput";
import SelectInput from "./Inputs/SelectInput";
import TextAreaInput from "./Inputs/TextAreaInput";

const NoteForm = ({ notes, setNotes }) => {
  const [formData, setFormData] = useState({
    title: "",
    priority: "Low",
    category: "Work",
    description: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(true);
  // New state for validation errors
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for the field being changed
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    // If there are errors, update state and prevent submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newNote = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);

    // Reset form and errors
    setFormData({
      title: "",
      priority: "Low",
      category: "Work",
      description: "",
    });
    setErrors({}); // Clear errors after successful submission
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full bg-gray-100 border border-gray-300 text-purple-800 py-2 rounded-lg cursor-pointer hover:bg-purple-200 hover:border-purple-300 transition mb-4"
      >
        {isFormVisible ? "Hide Form X" : "Add New Note ✚"}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mb-6">
          {/* Title Input - Now using TextInput component */}
          <TextInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required={true}
            errors={errors}
          />

          <SelectInput
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={[
              { value: "Low", label: "Low" },
              { value: "Medium", label: "Medium" },
              { value: "High", label: "High" },
            ]}
            required={true}
            errors={errors}
          />

          {/* Changed CategoryInput to SelectInput */}
          <SelectInput
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={[
              { value: "Work", label: "💼 Work" },
              { value: "Personal", label: "🏡 Personal" },
              { value: "Other", label: "📝 Other" },
            ]}
            required={true}
            errors={errors}
          />

          <TextAreaInput
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required={true}
            errors={errors}
            rows={4}
            placeholder="Enter note description"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
          >
            Add Note
          </button>
        </form>
      )}
    </>
  );
};

export default NoteForm;
