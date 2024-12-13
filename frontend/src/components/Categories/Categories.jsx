import React, { useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import "./Categories.css";
import { getCategories } from "../../api/categories/categories.js";
import AddCategory from "../Card/AddCategory/AddCategory.jsx";
import { getProductsByCategory } from "../../api/products/products.js";
import AddProduct from "../Card/AddProduct/AddProduct.jsx";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Modal } from "@mui/material";

const ItemList = ({
  items,
  noItemsMessage,
  onSelect,
  isCartItem,
}) => {
  if (items.length === 0) {
    return <div className="no-items-message">{noItemsMessage}</div>;
  }

  return items.map((item) => (
    <Card
      key={item._id}
      isCartItem={isCartItem}
      deliveryTime={item.deliveryTime}
      image={item.photo}
      price={item.price}
      id={item._id}
      title={item.name}
      onSelect={onSelect}
    />
  ));
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const isAdmin = useSelector((state) => state.user.isAdmin);

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
    const buttonText = selectedCategory
      ? "+ Add new product"
      : "+ Add new category";
    return (
      <button className="category-button" onClick={toggleModal}>
        {buttonText}
      </button>
    );
  };

  const renderContent = () => {
    return selectedCategory ? (
      <ItemList
        items={products}
        isCartItem={true}
        noItemsMessage="No products available for this category."
        onSelect={updateProducts}
      />
    ) : (
      <ItemList
        items={categories}
        noItemsMessage="No categories available."
        onSelect={updateProducts}
      />
    );
  };

  const closeModal = () => setIsModalOpen(false);

  const backToCategories = () => setSelectedCategory(null);

  return (
    <div className="categories-wrapper">
      {selectedCategory && (
        <button className="button-back" onClick={backToCategories}>
          <img src="assets/images/back.png" alt="back" width={30} />
        </button>
      )}

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "80vw",
            width: "100%",
            backgroundColor: "white",
            padding: 2,
            borderRadius: 1,
          }}
        >
          {
            selectedCategory ? (
              <AddProduct
                category={selectedCategory}
                onClose={toggleModal}
                onConfirm={updateProducts}
              />
              ) : (
              <AddCategory onClose={toggleModal} onConfirm={updateCategories} />)
          }
        </Box>
      </Modal>

      <h2>{selectedCategory ? "PRODUCTS" : "CATEGORIES"}</h2>
      {isAdmin && renderAddButton()}

      <div className="main-container">{renderContent()}</div>
    </div>
  );
};

export default Categories;
