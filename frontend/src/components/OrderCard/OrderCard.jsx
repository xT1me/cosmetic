import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OrderProduct from "../OrderProduct.jsx/OrderProduct.jsx";

const OrderCard = ({ order, expandedOrder, onToggleExpand, images }) => {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      style={{
        margin: '16px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          style={{
            fontWeight: 'bold',
            marginBottom: '8px',
            color: '#333',
          }}
        >
          Order №{order.orderNumber}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: '#555',
            marginBottom: '4px',
          }}
        >
          Status: {order.status}
        </Typography>
        <Typography
          variant="body2"
          style={{
            color: '#555',
            marginBottom: '16px',
          }}
        >
          Total Price: <span style={{ fontWeight: 'bold' }}>${order.totalPrice}</span>
        </Typography>
        <Button
          onClick={() => onToggleExpand(order._id)}
          style={{
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          {expandedOrder === order._id ? "Show less" : "Show more"}
        </Button>
        {expandedOrder === order._id && (
          <div style={{ marginTop: '16px' }}>
            <Typography
              variant="body2"
              style={{
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#333',
              }}
            >
              Products:
            </Typography>
            {order.products.map((product) => (
              <OrderProduct
                key={product._id}
                product={product}
                image={images[product._id]}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
