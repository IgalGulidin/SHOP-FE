import { useContext, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { authApi } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      localStorage.removeItem("token");
      setToken(null);

      const loginResponse = await authApi.login(form.email, form.password);
      setToken(loginResponse.token);
      navigate("/");
    } catch (error) {
      setErrorMessage(error?.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="sm">
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField 
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />

            <TextField 
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />

            {errorMessage && (
                <Typography color="error" sx={{ mt: 1 }}>
                    {errorMessage}
                </Typography>
            )}

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Login
            </Button>
          </Box>

          <Typography sx={{ mt: 2 }}>
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
