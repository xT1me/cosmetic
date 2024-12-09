import React from "react";
import Form from "../../../ui/Form/Form.jsx";
import { createCategory } from "../../../api/categories/categories.js";

const AddCategory = ({ onClose, onConfirm, username }) => {
  const handleAddCategory = async (formData) => {
    await createCategory(formData.categoryName, formData.file);
    onConfirm()
    onClose()
  };

  return (
    <Form
      fields={[
        {
          name: "categoryName",
          label: "Category Name",
          type: "text",
          required: true,
        },
        {
          name: "file",
          label: "Category Image",
          type: "file",
          required: false,
        },
      ]}
      onSubmit={handleAddCategory}
      title="Create Category"
      buttonText="Add Category"
      onClose={onClose}
    />
  );
};

export default AddCategory;
