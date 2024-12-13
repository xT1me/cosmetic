import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const OrderProduct = ({ product, image }) => {
  return (
    <Card variant="outlined" sx={{ marginTop: 1 }}>
      <CardContent>
        <Typography variant="h6">{product.productId.name}</Typography>
        <Typography variant="body2">
          Price: ${product.productId.price} | Quantity: {product.count}
        </Typography>
        <img
          src={image || 'default-image.jpg'}
          alt={product.productId.name}
          width={100}
        />
      </CardContent>
    </Card>
  );
};

export default OrderProduct;
