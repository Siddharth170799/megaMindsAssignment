import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { validateEmail, validatePassword } from "../validations";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const postLoginDetails = process.env.REACT_APP_GET_LOGIN_DETAILS;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { fetchingData } = useFetch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let errorMessage = "";
    if (name === "email" && !validateEmail(value)) {
      errorMessage = "Enter a valid email.";
    } else if (name === "password" && !validatePassword(value)) {
      errorMessage =
        "Password must be 8+ chars, 1 letter, 1 number, 1 special char.";
    }
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const details = await fetchingData(
      { Email: formData.email, Password: formData.password },
      "POST",
      postLoginDetails
    );
  
    if (details.token) {
      localStorage.setItem("token", details.token);
      navigate("/DashBoard");
    }else{
      alert("Inavlid Email or Password")
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          bgcolor: "white",
        }}
      >
        <Typography variant="h5" mb={2}>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, bgcolor: "#1976d2", color: "white" }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
