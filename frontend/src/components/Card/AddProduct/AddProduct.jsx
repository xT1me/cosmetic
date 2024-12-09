import React from 'react';

import Form from '../../../ui/Form/Form.jsx';
import { createProduct } from '../../../api/products/products.js';


const AddProduct = ({category, onClose, onConfirm, username}) => {
  const fields = [
    { name: 'name', label: 'Product Name', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', required: true },
    { name: 'image', label: 'Product Image', type: 'file', required: true },
  ];

  const handleSubmit = async (formData) => {
    await createProduct({...formData, category});
    onConfirm(category)
    onClose()
  };

  return (
    <Form
      title="Add Product"
      fields={fields}
      onSubmit={handleSubmit}
      buttonText="Add Product"
      onClose={onClose}
    />
  );
};

export default AddProduct;
