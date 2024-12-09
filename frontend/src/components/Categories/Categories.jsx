import React, { useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import "./Categories.css";
import { getCategories } from "../../api/categories/categories.js";
import AddCategory from "../Card/AddCategory/AddCategory.jsx";
import { getProductsByCategory } from "../../api/products/products.js";
import AddProduct from "../Card/AddProduct/AddProduct.jsx";

const ItemList = ({ items, noItemsMessage, onSelect, isCartItem, onAddToCart, username }) => {
  if (items.length === 0) {
    return <div className="no-items-message">{noItemsMessage}</div>;
  }
  
  return items.map((item) => (
    <Card
      key={item._id}
      username={username}
      isCartItem={isCartItem}
      image={item.photo}
      price={item.price}
      quantity={item.quantity}
      id={item._id}
      title={item.name}
      onSelect={onSelect}
      onAddToCart={onAddToCart}
    />
  ));
};

const Categories = ({onAddToCart, username}) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const updateCategories = async () => {
    const categories = await getCategories();
    setCategories(categories);
  };

  const updateProducts = async (id) => {
    const products = await getProductsByCategory(id);
    setProducts(products);
    setSelectedCategory(id);
  };

  useEffect(() => {
    updateCategories();
  }, []);

  const toggleModal = () => setIsModalOpen((prevState) => !prevState);

  const renderAddButton = () => {
    const buttonText = selectedCategory ? "+ Add new product" : "+ Add new category";
    return <button className="category-button" onClick={toggleModal}>{buttonText}</button>;
  };

  const renderContent = () => {
    return selectedCategory ? (
      <ItemList
        items={products}
        isCartItem={true}
        onAddToCart={onAddToCart}
        noItemsMessage="No products available for this category."
        onSelect={updateProducts}
        username={username}
      />
      
    ) : (
      <ItemList
        items={categories}
        username={username}
        noItemsMessage="No categories available."
        onSelect={updateProducts}
      />
    );
  };

  const backToCategories = () => setSelectedCategory(null);

  return (
    <div className="categories-wrapper">
      {selectedCategory && (
        <button className="button-back" onClick={backToCategories}>
          <img src="assets/images/back.png" alt="back" width={30} />
        </button>
      )}
      
      {isModalOpen && (
        selectedCategory ? (
          <AddProduct category={selectedCategory} onClose={toggleModal} onConfirm={updateProducts} />
        ) : (
          <AddCategory onClose={toggleModal} onConfirm={updateCategories} />
        )
      )}
      
      <h2>{selectedCategory ? "PRODUCTS" : "CATEGORIES"}</h2>
      {username === 'admin' && renderAddButton()}
      
      <div className="main-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default Categories;
