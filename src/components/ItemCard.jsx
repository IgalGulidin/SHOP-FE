import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box
} from "@mui/material";

export default function ItemCard({ item, onAddFavorite, onRemoveFavorite, onAddToCart }) {
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

        <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {onAddFavorite && (
              <Button variant="contained" onClick={() => onAddFavorite(item.id)}>
                Add to Favorites
              </Button>
            )}

            {onRemoveFavorite && (
              <Button 
                variant="outlined"
                color="error"
                onClick={() => onRemoveFavorite(item.id)}
              >
                Remove Favorite
              </Button>
            )}
            
            {onAddToCart && (
              <Button
                variant="outlined"
                disabled={item.stockQty === 0}
                onClick={() => onAddToCart(item.id)}
              >
                Add to Cart
              </Button>
            )}
        </Box>
      </CardContent>
    </Card>
  );
}
