import React, { useState } from "react";
import "./Form.css";

const Form = ({ fields, onSubmit, title, buttonText, initialData = {}, additionalContent, errorMessage }) => {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fields.some((field) => !formData[field.name])) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="form-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} className="form">
        {fields.map((field) => (
          <div className="form-input" key={field.name}>
            <label>{field.label}</label>
            {field.type === "file" ? (
              <div className="custom-file-input">
                <input
                  type="file"
                  name={field.name}
                  onChange={handleFileChange}
                  required={field.required}
                  className="file-input"
                  id={field.name}
                />
                <label htmlFor={field.name} className="file-label">
                  <img src="assets/images/file.png" alt="file" width={25} />
                  <p>{formData[field.name]?.name || "Choose a file"}</p>
                </label>
              </div>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                required={field.required}
                className="text-input"
              />
            )}
          </div>
        ))}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn">
          {buttonText}
        </button>
      </form>
      {additionalContent && <div className="additional-content">{additionalContent}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Form;
