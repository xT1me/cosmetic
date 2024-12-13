import React, { useEffect, useState } from "react";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";
import "./Card.css";
import { getCategoryImage } from "../../api/categories/categories";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/cart/cartActions";

const Card = ({
  image,
  title,
  isCartItem,
  onSelect,
  id,
  price,
  deliveryTime,
}) => {
  const dispatch = useDispatch();
  const cartReducer = new cartActions(dispatch);

  const cartItems = useSelector(state => state.cart.cartItems)

  const [photo, setPhoto] = useState(null);
  const [count, setCount] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      if (image) {
        const parsedImage = prepareImage(image);
        const photo = await getCategoryImage(parsedImage);
        setPhoto(photo);
      }
    };
    fetchImage();
  }, [image]);

  const prepareImage = () => {
    return image.replace("/uploads", "");
  };

  const handleIncrease = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrease = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  const handleAddToCart = () => {
    cartReducer.addItem(cartItems, { id, title, price, count, deliveryTime, photo: image })
  };

  const openProducts = () => {
    onSelect(id);
  };

  const handleImageClick = () => {
    setIsLightboxOpen(true);
  };

  return (
    <div
      className="card"
      style={{
        width: isCartItem ? 290 : 200,
        height: isCartItem ? 420 : 300,
      }}
    >
      {photo && (
        <img
          src={photo}
          alt={title}
          className="card-image"
          height={150}
          onClick={handleImageClick}
        />
      )}
      <p className="card-title">{title}</p>
      {price && <h3>$ {price}</h3>}
      {deliveryTime && (
        <p className="card-title">Delivery time: ~ ${deliveryTime} days</p>
      )}
      {isCartItem && (
        <div className="card-quantity">
          <button onClick={handleDecrease} className="quantity-button">
            -
          </button>
          <input
            type="text"
            value={count}
            readOnly
            className="quantity-input"
          />
          <button onClick={handleIncrease} className="quantity-button">
            +
          </button>
        </div>
      )}
      {isCartItem ? (
        <button className="card-button" onClick={handleAddToCart}>
          + ADD TO CART
          <span className="card-underline"></span>
        </button>
      ) : (
        <button className="card-button" onClick={openProducts}>
          SHOP NOW
          <span className="card-underline"></span>
        </button>
      )}
      {isLightboxOpen && (
        <Lightbox
          mainSrc={photo}
          onCloseRequest={() => setIsLightboxOpen(false)}
        />
      )}
    </div>
  );
};

export default Card;
