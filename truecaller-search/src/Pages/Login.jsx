import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";

export default function SignIn() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const mobileNumberRegex = /^\+\d{1,3}\d{6,14}$/;
    try {
      if (!mobileNumberRegex.test(phoneNumber)) {
        return alert("Invalid Phone number, phone number should be with country code")
      }
      console.log("🚀 ~ SignIn ~ phoneNumber:", phoneNumber);
      const response = await api.loginApi(phoneNumber);
      const loginData = response.data?.result
      if (loginData) {
        const mobile = phoneNumber;
        setPhoneNumber("");
        navigate("/verifyOTP", { state: { loginData, mobile } });
      } else if (response.data?.error?.message) {
        alert(response.data?.error?.message)
      } else {
        alert("Something went Wrong")
      }
    } catch (error) {
      console.log("error", error);
      alert("Something went Wrong")
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Change Installation ID
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="phonenumber"
            label="Phone Number"
            name="phonenumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            autoComplete="phonenumber"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
