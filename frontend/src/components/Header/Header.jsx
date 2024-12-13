import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Auth from "../Auth/Auth.jsx";
import Cart from "../Cart/Cart.jsx";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector(state => state.cart.cartItems)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  const getTotalItemCount = () =>
    cartItems.reduce((total, item) => total + item.count, 0);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#222" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#f9a825", cursor: "pointer" }}
        >
          KISS&LOVE
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <IconButton sx={{ color: "icon.light" }} onClick={toggleModal}>
            <Badge badgeContent={getTotalItemCount()} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {user && (
              <Typography variant="body1" sx={{ color: "#fff", fontWeight: 900 }}>
                {user.username}
              </Typography>
            )}

            <Auth setIsOpen={setIsOpen} isOpen={isOpen} />
          </Box>
        </Box>
      </Toolbar>

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
          <Cart
            toggleAuthModal={() => setIsOpen(true)}
            close={closeModal}
          />
        </Box>
      </Modal>
    </AppBar>
  );
};

export default Header;
