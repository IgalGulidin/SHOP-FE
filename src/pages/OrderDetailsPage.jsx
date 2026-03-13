import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { ordersApi } from "../api/orders";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await ordersApi.getById(orderId);
        setOrderDetails(orderData);
        setErrorMessage("");
      } catch (error) {
        console.error("Failed to load order details", error);
        setErrorMessage(
          error?.response?.data?.error || "Failed to load order details",
        );
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <>
      <Navbar />

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Order Details
        </Typography>
        {errorMessage && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}
        {!orderDetails} ? (<Typography>Loading order details...</Typography>) :
        (
        <>
          <Typography sx={{ mb: 1 }}>Order ID: #{orderDetails.id}</Typography>

          <Typography sx={{ mb: 1 }}>Status: {orderDetails.status}</Typography>

          <Typography sx={{ mb: 1 }}>
            Shipping Address: {orderDetails.shipCountry},{" "}
            {orderDetails.shipCity}
          </Typography>

          <Typography sx={{ mb: 3 }}>
            Total Price: ${orderDetails.totalPrice}
          </Typography>

          {orderDetails.items.map((item) => (
            <Card key={item.itemId} sx={{ mb: 2 }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.imageUrl}
                  alt={item.title}
                  sx={{ width: 120, height: 120, objectFit: "cover " }}
                />

                <Box>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography>Unit Price: ${item.unitPrice}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Typography>Line Total: ${item.lineTotal}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </>
        )
      </Box>
    </>
  );
}
