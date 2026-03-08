import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

export default function ItemCard({ item, onAddFavorites, onAddToCart }) {
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia
        component="img"
        height="200"
        image={item.imageUrl}
        alt={item.titke}
      />
      <CardContent>
        <Typography variant="h6">{item.title}</Typography>
        <Typography>${item.priceUsd}</Typography>
        <Typography color={item.stockQty === 0 ? "error" : "text.secondary"}>
          {item.stockQty === 0
            ? "0 items left in stock"
            : `${item.stockQty} items in stock`}
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 1, mr: 1 }}
          onClick={() => onAddFavorites(item.id)}
        >
          Add to Favorites
        </Button>

        <Button
          variant="outlined"
          sx={{ mt: 1 }}
          disabled={item.stockQty === 0}
          onClick={() => onAddToCart(item.id)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
