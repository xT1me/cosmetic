import React from "react";
import { Typography, Button } from "@mui/material";

const CartSummary = ({ total, onCreateOrder }) => {
  return (
    <>
      <Typography variant="h6" className="cart-total">
        Total Price: ${total}
      </Typography>
      <Button variant="contained" color="primary" style={{ marginLeft: 40 }} onClick={onCreateOrder}>
        Create Order
      </Button>
    </>
  );
};

export default CartSummary;
