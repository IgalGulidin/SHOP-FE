import { useEffect, useState, useContext } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import { itemsApi } from "../api/items";
import { favoritesApi } from "../api/favorites";
import { ordersApi } from "../api/orders";
import { AuthContext } from "../context/AuthContext";

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    itemsApi.getAll().then(setItems);
  }, []);

  const handleSearch = async (value) => {
    setSearch(value);
    if (!value) {
      const data = await itemsApi.getAll();
      setItems(data);
    } else {
      const data = await itemsApi.search(value);
      setItems(data);
    }
  };

  const handleAddFavorite = async (itemId) => {
    if (!token) {
      alert("Login first");
      return;
    }
    await favoritesApi.add(itemId);
    alert("Added to favorites");
  };

  const handleAddToCart = async (itemId) => {
    if (!token) {
      alert("Login first");
      return;
    }
    await ordersApi.changeQty(itemId, 1);
    alert("Added to cart");
  };

  return (
    <>
      <Navbar />

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Welcome to my shop
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
    </>
  );
}
