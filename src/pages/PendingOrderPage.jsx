import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { ordersApi } from "../api/orders";

export default function PendingOrderPage() {
  const [pendingOrder, setPendingOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPendingOrder = async () => {
      try {
        const orderData = await ordersApi.pending();
        setPendingOrder(orderData);
        setErrorMessage("");
      } catch (error) {
        console.error("Failed to load pending order", error);
        setErrorMessage("Failed to load pending order");
      }
    };

    fetchPendingOrder();
  }, []);

  const handleIncreaseQuantity = async (itemId) => {
    try {
      const updatedOrder = await ordersApi.changeQty(itemId, 1);
      setPendingOrder(updatedOrder);
    } catch (error) {
      alert(error?.response?.data?.error || "Failed to increase quantity");
    }
  };

  const handleDecreaseQuantity = async (itemId) => {
    try {
      const updatedOrder = await ordersApi.changeQty(itemId, -1);
      setPendingOrder(updatedOrder);
    } catch (error) {
      alert(error?.response?.data?.error || "Failed to decrease quantity");
    }
  };

  const handlePay = async () => {
    try {
      const paidOrder = await ordersApi.pay();
      setPendingOrder(null);
      alert(`Payment successful. Order #${paidOrder.id} is now CLOSED.`);
    } catch (error) {
      alert(error?.response?.data?.error || "Payment failed");
    }
  };

  return (
    <>
      <Navbar />

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Pending Order
        </Typography>

        {errorMessage && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        {!pendingOrder ? (
          <Typography>No pending order right now.</Typography>
        ) : (
          <>
            <Typography sx={{ mb: 1 }}>
              Shipping Address: {pendingOrder.shipCountry},{" "}
              {pendingOrder.shipCity}
            </Typography>

            <Typography sx={{ mb: 3 }}>
              Total Price: ${pendingOrder.totalPrice}
            </Typography>

            {pendingOrder.items.map((item) => (
              <Card key={item.itemId} sx={{ mb: 2 }}>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CardMedia
                      component="img"
                      image={item.imageUrl}
                      alt={item.title}
                      sx={{ width: 120, height: 120, objectFit: "cover" }}
                    />

                    <Box>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography>Unit Price: ${item.unitPrice}</Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                      <Typography>Line Total: ${item.lineTotal}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleDecreaseQuantity(item.itemId)}
                    >
                      -1
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => handleIncreaseQuantity(item.itemId)}
                    >
                      +1
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}

            <Button variant="contained" color="success" onClick={handlePay}>
              Pay Now
            </Button>
          </>
        )}
      </Box>
    </>
  );
}
