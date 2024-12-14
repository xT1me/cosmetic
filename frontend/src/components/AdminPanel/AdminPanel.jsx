import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  CssBaseline,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAllOrders, updateOrderStatus } from "../../api/orders/order";
import moment from "moment";

const drawerWidth = 0;

const AdminOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getAllOrders();
      const formattedOrders = fetchedOrders.map((order) => ({
        ...order,
        userName: order.user?.username || "Unknown",
        createdAtFormatted: moment(order.createdAt).format("YYYY-MM-DD HH:mm"),
      }));
      setOrders(formattedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = search
      ? order.userName.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { field: "orderNumber", headerName: "Order #", width: 100 },
    { field: "userName", headerName: "User", width: 150 },
    { field: "totalPrice", headerName: "Total Price", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <Select
          value={params.row.status}
          onChange={(e) => handleStatusChange(params.row._id, e.target.value)}
          fullWidth
        >
          <MenuItem value="in transit">In Transit</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      ),
    },
    { field: "createdAtFormatted", headerName: "Created At", width: 200 },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Box>
      </Drawer> */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>
        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="Search by User"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="in transit">In Transit</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <DataGrid
          rows={filteredOrders}
          columns={columns}
          pageSize={5}
          autoHeight
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default AdminOrdersTable;
