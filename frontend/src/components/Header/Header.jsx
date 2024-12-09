import React, { useState } from "react";
import Modal from "../../ui/Modal/Modal.jsx";
import AuthForm from "../AuthForm/AuthForm.jsx";
import Cart from "../Cart/Cart.jsx";
import { logout } from "../../api/auth/auth.js";

const Header = ({
  isAuth,
  setAuth,
  username,
  setUsername,
  setUserId,
  cartItems,
  userId,
  handleRemoveItem,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpened, setIsAuthOpened] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCart = () => {
    toggleModal();
  };

  const toggleAuthModal = () => {
    setIsAuthOpened(!isAuthOpened);
  };

  const logoutAccount = () => {
    logout();
    setAuth(false);
  };

  const onAuthSuccess = (username, id) => {
    setAuth(true);
    toggleAuthModal();
    setUsername(username);
    setUserId(id);
  };

  const getTotalItemCount = () => {
    return cartItems.reduce((total, item) => total + item.count, 0);
  };

  return (
    <header style={headerStyles.header}>
      {isAuthOpened && (
        <AuthForm onClose={toggleAuthModal} onAuthSuccess={onAuthSuccess} />
      )}
      <div style={headerStyles.logo}>KISS&LOVE</div>
      <div style={headerStyles.icons}>
        <button style={headerStyles.cart} onClick={openCart}>
          <img src="assets/images/shopping-cart.png" alt="cart" height={25} />
          <div style={headerStyles.cartBadge}>{getTotalItemCount()}</div>
        </button>
        <div style={headerStyles.user}>
          {isAuth && (
            <h3
              style={{
                margin: 0,
              }}
            >
              {username}
            </h3>
          )}
          {isAuth ? (
            <button onClick={logoutAccount} style={headerStyles.auth}>
              <img src="assets/images/logout.png" alt="logout" height={25} />
            </button>
          ) : (
            <button onClick={toggleAuthModal} style={headerStyles.auth}>
              <img src="assets/images/user.png" alt="user" height={25} />
            </button>
          )}
        </div>

        {isModalOpen && (
          <Modal onClose={toggleModal}>
            {" "}
            <Cart
              key={JSON.stringify(cartItems)}
              handleRemoveItem={handleRemoveItem}
              cartItems={cartItems}
              toggleAuthModal={toggleAuthModal}
              isAuth={isAuth}
              userId={userId}
              close={closeModal}
            />
          </Modal>
        )}
      </div>
    </header>
  );
};

const headerStyles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#222",
    color: "#fff",
    position: "relative",
    zIndex: 1000,
  },
  user: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  auth: {
    background: "none",
    border: "none",
    cursor: "pointer",
    height: 25,
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#f9a825",
    transition: "color 0.3s ease",
    cursor: "pointer",
    marginRight: "auto",
  },
  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    position: "relative",
  },
  cart: {
    position: "relative",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    transition: "color 0.3s ease",
    height: 25,
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    background: "#f9a825",
    borderRadius: "50%",
    color: "#fff",
    width: 20,
    height: 20,
    fontFamily: "sans-serif",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Header;
