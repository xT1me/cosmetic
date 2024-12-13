import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrdersByUserInTransit, getOrdersByUserCompleted } from "../../api/orders/order";
import { getCategoryImage } from "../../api/categories/categories";
import CartItem from "../CartItem/CartItem.jsx";
import CartSummary from "../CartSummary/CartSummary.jsx";
import OrderTabs from "../OrderTabs/OrderTabs.jsx";
import OrderCard from "../OrderCard/OrderCard.jsx";
import { Typography, Grid } from "@mui/material"; // Added Material-UI components
import "./Cart.css";
import { cartActions } from "../redux/cart/cartActions.js";

const Cart = ({ toggleAuthModal, close }) => {
  const user = useSelector(state => state.user.user);
  const cartItems = useSelector(state => state.cart.cartItems);

  const dispatch = useDispatch();
  const cartReducer = new cartActions(dispatch);

  const [selectedTab, setSelectedTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [images, setImages] = useState({});
  const [cartImages, setCartImages] = useState({});

  const calculateTotal = () => cartItems.reduce((total, item) => total + item.price * item.count, 0);

  const handleCreateOrder = async () => {
    if (user) {
      await createOrder(user._id, cartItems, calculateTotal());
      close();
      cartReducer.clearCart();
    } else {
      toggleAuthModal();
      close();
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          let activeOrders = [];
          if (selectedTab === 1) activeOrders = await getOrdersByUserInTransit(user._id);
          else if (selectedTab === 2) activeOrders = await getOrdersByUserCompleted(user._id);
          setOrders(activeOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };
    fetchOrders();
  }, [selectedTab, user]);

  const handleToggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const fetchImage = async (image) => {
    if (image) {
      const parsedImage = prepareImage(image);
      const photo = await getCategoryImage(parsedImage);
      return photo;
    }
  };

  const prepareImage = (image) => image.replace("/uploads", "");

  useEffect(() => {
    const loadImages = async () => {
      const newImages = {};
      for (const order of orders) {
        for (const product of order.products) {
          const photo = await fetchImage(product.productId.photo);
          newImages[product._id] = photo;
        }
      }
      setImages(newImages);
    };
    if (orders.length > 0) {
      loadImages();
    }
  }, [orders]);

  useEffect(() => {
    const loadCartItemImages = async () => {
      const newCartImages = {};
      for (const item of cartItems) {
        if (item.photo) {
          const photo = await fetchImage(item.photo);
          newCartImages[item.id] = photo;
        }
      }
      setCartImages(newCartImages);
    };
    if (cartItems.length > 0) {
      loadCartItemImages();
    }
  }, [cartItems]);

  return (
    <div className="cart">
      <OrderTabs selectedTab={selectedTab} onTabChange={(event, newValue) => setSelectedTab(newValue)} />

      <div>
        {selectedTab === 0 && (
          <>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              style={{
                fontWeight: "bold",
                fontSize: "32px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#333",
                marginBottom: "20px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Your Order
            </Typography>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item, index) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    index={index}
                    image={cartImages[item.id]}
                  />
                ))}
              </ul>
            ) : (
              <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "10px",
                    color: "#757575",
                  }}
                >
                  Your cart is empty
                </Typography>
              </Grid>
            )}
            {cartItems.length > 0 && <CartSummary total={calculateTotal()} onCreateOrder={handleCreateOrder} />}
          </>
        )}

        {(selectedTab === 1 || selectedTab === 2) && (
          <div>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              style={{
                fontWeight: "bold",
                fontSize: "32px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#333",
                marginBottom: "20px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {selectedTab === 1 ? "Active Orders" : "Orders History"}
            </Typography>
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  expandedOrder={expandedOrder}
                  onToggleExpand={handleToggleExpand}
                  images={images}
                />
              ))
            ) : (
              <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "10px",
                    color: "#757575",
                  }}
                >
                  No orders
                </Typography>
              </Grid>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
