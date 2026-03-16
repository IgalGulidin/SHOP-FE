import { useEffect, useState, useContext } from "react";
import { Box, Grid, TextField, Typography, CircularProgress  } from "@mui/material";
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
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  const { token } = useContext(AuthContext);
  
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
    const fetchItems = async () => {
      try {
        setIsPageLoading(true);
        const itemsData = await itemsApi.getAll();
        setItems(itemsData);
      } catch (error) {
        showSnackbar(error?.response?.data?.error || "Failed to load items", "error")
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = async (value) => {
    setSearch(value);
    try {
      setIsPageLoading(true);
      if (!value.trim()) {
        const itemsData = await itemsApi.getAll();
        setItems(itemsData);
        return;
      }
      const searchResults = await itemsApi.search(value);
      setItems(searchResults);
    } catch (error) {
      showSnackbar(error?.response?.data?.error || "Failed to search items", "error");
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleAddFavorite = async (itemId) => {
    if (!token) {
      showSnackbar("Login first", "warning");
      return;
    }

    try{
      setIsActionLoading(true);
      await favoritesApi.add(itemId);
      showSnackbar("Added to favorites", "success");
    } catch (error) {
      showSnackbar(error?.response?.data?.error || "Failed to add favorite", "error");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleAddToCart = async (itemId) => {
    if (!token) {
      showSnackbar("Login first", "warning");
      return;
    }

    try {
      setIsActionLoading(true);
      await ordersApi.changeQty(itemId, 1);

      const itemsData = await itemsApi.getAll();
      setItems(itemsData);

      showSnackbar("Added to cart", "success");
    } catch (error) {
      showSnackbar(error?.response?.data?.error || "Failed to add to cart", "error")
    } finally {
      setIsActionLoading(false);
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

        {isPageLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : items.length === 0 ? (
          <Typography>No items found.</Typography>
        ) : (
          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid key={item.id}>
                <ItemCard
                  item={item}
                  onAddFavorite={handleAddFavorite}
                  onAddToCart={handleAddToCart}
                  isActionLoading={isActionLoading}
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
