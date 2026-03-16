import { useEffect, useState, useContext } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import { itemsApi } from "../api/items";
import { favoritesApi } from "../api/favorites";
import { ordersApi } from "../api/orders";
import { AuthContext } from "../context/AuthContext";
import AppSnackbar from "../components/AppSnackbar";

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const { token } = useContext(AuthContext);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const fetchItems = async () => {
      const itemsData = await itemsApi.getAll();
      setItems(itemsData);
    };

    fetchItems();
  }, []);

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      const itemsData = await itemsApi.getAll();
      setItems(itemsData);
      return;
    }

    const searchResults = await itemsApi.search(value);
    setItems(searchResults);
  };

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

  const handleAddFavorite = async (itemId) => {
    if (!token) {
      showSnackbar("Login first", "warning");
      return;
    }

    try{
      await favoritesApi.add(itemId);
      showSnackbar("Added to favorites", "success");
    } catch (error) {
      showSnackbar(error?.response?.data?.error || "Failed to add favorite", "error");
    }
  };

  const handleAddToCart = async (itemId) => {
    if (!token) {
      showSnackbar("Login first", "warning");
      return;
    }

    try {
      await ordersApi.changeQty(itemId, 1);
      const itemsData = await itemsApi.getAll();
      setItems(itemsData);
      showSnackbar("Added to cart", "success");
    } catch (error) {
      showSnackbar(error?.response?.data?.error || "Failed to add to cart", "error")
    }
  };

  return (
    <>
      <Navbar />

      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Products
        </Typography>

        <TextField
          label="Search items"
          value={search}
          onChange={(error) => handleSearch(error.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />

        {items.length === 0 ? (
          <Typography>No items found.</Typography>
        ) : (
          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid key={item.id}>
                <ItemCard
                  item={item}
                  onAddFavorite={handleAddFavorite}
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
