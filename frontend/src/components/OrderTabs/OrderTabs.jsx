import React from "react";
import { Box, Tabs, Tab } from "@mui/material";

const OrderTabs = ({ selectedTab, onTabChange }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={selectedTab} onChange={onTabChange} aria-label="order tabs">
        <Tab label="Cart" />
        <Tab label="Active orders" />
        <Tab label="Orders History" />
      </Tabs>
    </Box>
  );
};

export default OrderTabs;
