import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { ordersApi } from "../api/orders";
import AppSnackbar from "../components/AppSnackbar";

export default function PendingOrderPage() {
  const navigate = useNavigate();
  const [pendingOrder, setPendingOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((previous) => ({
      ...previous,
      open: false,
    }));
  };

  useEffect(() => {
    const fetchPendingOrder = async () => {
      try {
        setIsPageLoading(true);
        const orderData = await ordersApi.pending();
        setPendingOrder(orderData);
        setErrorMessage("");
      } catch (error) {
        console.error("Failed to load pending order", error);
        setErrorMessage("Failed to load pending order");
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchPendingOrder();
  }, []);

  const handleIncreaseQuantity = async (itemId) => {
    try {
      setIsUpdatingOrder(true);
      const updatedOrder = await ordersApi.changeQty(itemId, 1);
      setPendingOrder(updatedOrder);
      showSnackbar("Quantity increased", "success");
    } catch (error) {
      showSnackbar(
        error?.response?.data?.error || "Failed to increase quantity",
        "error",
      );
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  const handleDecreaseQuantity = async (itemId) => {
    try {
      setIsUpdatingOrder(true);
      const updatedOrder = await ordersApi.changeQty(itemId, -1);
      setPendingOrder(updatedOrder);

      if (!updatedOrder) {
        showSnackbar("Pending order is now empty", "info");
      }
    } catch (error) {
      showSnackbar(
        error?.response?.data?.error || "Failed to decrease quantity",
        "error",
      );
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  const handlePay = async () => {
    try {
      setIsPaying(true);
      const paidOrder = await ordersApi.pay();

      showSnackbar(
        `Payment successful. Order #${paidOrder.id} is now CLOSED.`,
        "success",
      );

      setTimeout(() => {
        navigate("/orders");
      }, 1200);
    } catch (error) {
      showSnackbar(error?.response?.data?.error || "Payment failed", "error");
    } finally {
      setIsPaying(false);
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

        {isPageLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : !pendingOrder ? (
          <Typography>No pending order right now.</Typography>
        ) : (
          <>
            <Typography sx={{ mb: 1 }}>
              Shipping Address: {pendingOrder.shipCountry},
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
                      disabled={isUpdatingOrder || isPaying}
                      onClick={() => handleDecreaseQuantity(item.itemId)}
                    >
                      -1
                    </Button>

                    <Button
                      variant="contained"
                      disabled={isUpdatingOrder || isPaying}
                      onClick={() => handleIncreaseQuantity(item.itemId)}
                    >
                      +1
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="contained"
              color="success"
              disabled={isUpdatingOrder || isPaying}
              onClick={handlePay}
            >
              {isPaying ? "Processing Payment..." : "Pay Now"}
            </Button>
          </>
        )}
      </Box>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
}
