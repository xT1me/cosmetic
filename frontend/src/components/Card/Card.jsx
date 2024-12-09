import React, { useEffect, useState } from 'react';
import './Card.css';
import { getCategoryImage } from '../../api/categories/categories';


const Card = ({ image, title, isCartItem, onSelect, id, price, onAddToCart }) => {
  const [photo, setPhoto] = useState(null)
  const [count, setCount] = useState(1)


  useEffect(async () => {
    if (image) {
      const parsedImage = prepareImage(image)
      const photo = await getCategoryImage(parsedImage)
      setPhoto(photo)
    }
  }, [image])

  const prepareImage = () => {
    const parsedImage = image.replace('/uploads', '')
    return parsedImage
  }

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
  };

  const handleDecrease = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({ id, title, price, count });
  };

  const openProducts = () => {
    onSelect(id)
  }


  return (
    <div className="card" style={{
      width: isCartItem ? 290 : 200,
      height: isCartItem ? 420 : 300
    }}>
      {
        photo &&
        <img src={photo} alt={title} className="card-image" height={150}/>
      }
      <p className="card-title">{title}</p>
      { price && <h3>$ {price}</h3> }
      {isCartItem && (
        <div className="card-quantity">
          <button onClick={handleDecrease} className="quantity-button">-</button>
          <input
            type="text"
            value={count}
            readOnly
            className="quantity-input"
          />
          <button onClick={handleIncrease} className="quantity-button">+</button>
        </div>
      )}
      {
        isCartItem ?
        <button className="card-button" onClick={handleAddToCart}>
          + ADD TO CART
          <span className="card-underline"></span>
        </button> :
          <button className="card-button" onClick={openProducts}>
          SHOP NOW
          <span className="card-underline"></span>
          </button> 
      }
    </div>
  );
};

export default Card;