import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import { favoritesApi } from "../api/favorites";
import { ordersApi } from "../api/orders";
import AppSnackbar from "../components/AppSnackbar";

export default function FavoritesPage() {
  const [favoriteItems, setFavoriteItems] = useState([]);
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

  const loadFavorites = async () => {
    try {
      const favorites = await favoritesApi.list();
      setFavoriteItems(favorites);
    } catch (error) {
      console.error("Failed to load favorites", error);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await favoritesApi.list();
        setFavoriteItems(favorites);
      } catch (error) {
        console.error("Failed to load favorites", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (itemId) => {
    try {
      await favoritesApi.remove(itemId);
      await loadFavorites();
      showSnackbar("Removed from favorites", "success");
    } catch (error) {
      showSnackbar(error?.response?.data?.error || "Failed to remove favorite", "error");
    }
  };

  const handleAddToCart = async (itemId) => {
    try {
      await ordersApi.changeQty(itemId, 1);
      showSnackbar("Added to cart", "success");
    } catch (error) {
      showSnackbar(error?.response?.data?.error || "Failed to add to cart", "error");
    }
  };

  return (
    <>
      <Navbar />

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          My Favorite Items
        </Typography>

        {favoriteItems.length === 0 ? (
          <Typography>No favorite items yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {favoriteItems.map((item) => (
              <Grid key={item.id}>
                <ItemCard
                  item={item}
                  onRemoveFavorite={handleRemoveFavorite}
                  onAddToCart={handleAddToCart}
                />
              </Grid>
            ))}
          </Grid>
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
