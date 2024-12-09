import React from "react";
import "./Cart.css";
import { createOrder } from "../../api/orders/order";

const Cart = ({
  cartItems,
  isAuth,
  userId,
  toggleAuthModal,
  close,
  handleRemoveItem,
}) => {
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.count, 0);

  const handleCreateOrder = async () => {
    if (isAuth) {
      await createOrder(userId, cartItems, calculateTotal());
      close();
    } else {
      close();
      toggleAuthModal();
    }
  };

  return (
    <div className="cart">
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.length > 0 ? (
        <ul className="cart-items">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <div className="cart-item-info">
                <p className="cart-item-title">{item.title}</p>
                <p className="cart-item-price">
                  {item.count} x ${item.price} = ${item.count * item.price}
                </p>
              </div>
              <button
                className="cart-item-remove"
                onClick={() => handleRemoveItem(index)}
              >
                <img src="assets/images/trash-can.png" alt="trash" width={25} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="cart-empty">Your cart is empty.</p>
      )}

      {cartItems.length > 0 && (
        <>
          <div className="cart-total">
            <strong>Total:</strong> ${calculateTotal()}
          </div>{" "}
          <button className="cart-submit" onClick={handleCreateOrder}>
            Create Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
