import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/cart/cartActions";

const CartItem = ({ item, index, image }) => {
    const dispatch = useDispatch()
    const cartReducer = new cartActions(dispatch)

    const cartItems = useSelector(state => state.cart.cartItems)
    const handleRemoveItem = () => {
        cartReducer.removeItem(cartItems, item)
    }
  return (
    <Card
      variant="outlined"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={image || "default-image.jpg"}
          alt={item.title}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "8px",
            marginRight: "15px",
          }}
        />
        <div>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            {item.title}
          </Typography>
          <Typography variant="body2" style={{ color: "#555" }}>
            {item.count} x ${item.price} = ${item.count * item.price}
          </Typography>
          {item.deliveryTime && (
            <Typography variant="body2" style={{ color: "#555" }}>
              Delivery time ~ ${item.deliveryTime}
            </Typography>
          )}
        </div>
      </div>
      <Button
        onClick={handleRemoveItem}
        style={{
          color: "#fff",
          borderRadius: "50%",
          padding: "5px",
          minWidth: "auto",
        }}
      >
        <img
          src="assets/images/trash-can.png"
          alt="trash"
          style={{ width: "20px", height: "20px" }}
        />
      </Button>
    </Card>
  );
};

export default CartItem;
