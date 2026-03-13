import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function OrderCard({ order, onOpen }) {
  const isTemp = order.status === "TEMP";

  return (
    <Card
      sx={{
        mb: 2,
        border: isTemp ? "2px solid orange" : "1px solid #ccc",
        backgroundColor: isTemp ? "#fff8e1" : "white",
      }}
    >
      <CardContent>
        <Typography variant="h6">Order #{order.id}</Typography>
        <Typography>Status: {order.status}</Typography>
        <Typography>Total Price: ${order.totalPrice}</Typography>
        <Typography>
          Shipping Address: {order.shipCountry}, {order.shipCity}
        </Typography>
        <Typography>
          Created At: {new Date(order.createdAt).toLocaleString()}
          </Typography>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => onOpen(order)}>
            {isTemp ? "Open Pending Order" : "View Details"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
