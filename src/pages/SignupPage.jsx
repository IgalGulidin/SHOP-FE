import { useContext, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { authApi } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
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
      const signupResponse = await authApi.signup(form);
      setToken(signupResponse.token);
      navigate("/");
    } catch (error) {
      setErrorMessage(error?.response?.date?.error || "Signup failed");
    }
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="sm">
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
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
            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={form.city}
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
              Sign Up
            </Button>
          </Box>

          <Typography sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
