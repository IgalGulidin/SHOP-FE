import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import OrderCard from "../components/OrderCard";
import { ordersApi } from "../api/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await ordersApi.list();
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to load orders", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOpenOrder = (order) => {
    if (order.status === "TEMP") {
      navigate("/orders/pending");
    } else {
      navigate(`/orders/${order.id}`);
    }
  };

  return (
    <>
      <Navbar />

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          My Orders
        </Typography>

        {orders.length === 0 ? (
          <Typography>No orders yet.</Typography>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} onOpen={handleOpenOrder} />
          ))
        )}
      </Box>
    </>
  );
}
