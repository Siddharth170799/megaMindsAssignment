import React, { useState } from "react";
import bcrypt from "bcryptjs";
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
import { validateName, validateEmail, validatePassword } from "../validations";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { fetchingData } = useFetch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let errorMessage = "";
    if (name === "name" && !validateName(value)) {
      errorMessage = "Name must be at least 3 letters.";
    } else if (name === "email" && !validateEmail(value)) {
      errorMessage = "Enter a valid email.";
    } else if (name === "password" && !validatePassword(value)) {
      errorMessage =
        "Password must be 8+ chars, 1 letter, 1 number, 1 special char.";
    }
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const GET_SIGNUP_URL = process.env.REACT_APP_GET_SIGNUP_DETAILS;
      const detailsExist = await fetchingData(null, "GET", GET_SIGNUP_URL);

      const checkingDetails = detailsExist.fetchedDetails.find(
        (item) => item.Email === formData.email
      );

      if (checkingDetails) {
        alert("Email Already Exists");
      } else {
        const hashedPassword = await bcrypt.hash(formData.password, 10);

        const newUserDetails = {
          Name: formData.name,
          Email: formData.email,
          Password: hashedPassword,
        };
        const SIGNUP_URL = process.env.REACT_APP_POST_SIGNUP_DETAILS;
        await fetchingData(newUserDetails, "POST", SIGNUP_URL);

        navigate("/signIn");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
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
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            error={!!errors.name}
            helperText={errors.name}
          />
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
            Sign Up
          </Button>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Button
              sx={{
                textTransform: "none",
                color: "#1976d2",
                fontWeight: "bold",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => navigate("/signIn")}
            >
              Login here
            </Button>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
