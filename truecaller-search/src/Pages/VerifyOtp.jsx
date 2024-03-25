import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const { loginData, mobile } = location?.state || {};

  useEffect(() => {
    if (!loginData || !mobile) {
      navigate("/login")
    }
  }, [loginData, mobile])


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loginData && mobile) {
      try {
        const response = await api.verifyOTP(mobile, loginData, otp);
        const installationId = response.data?.result

        if (installationId) {
          setOtp("");
          return navigate("/");
        } else if (response.data?.error?.message) {
          alert(response.data?.error?.message)
          return navigate("/login")
        } else {
          alert("Something went Wrong")
        }
      } catch (error) {
        console.log("error", error);
        alert("Something went Wrong")
      }

    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Grid container sx={{ paddingTop: "30px", marginBottom: "30px" }}>
        <Grid item xs sx={{ textAlign: "center" }}>
          <Box sx={{ fontSize: "30px", fontWeight: "bold" }}>Verify Phone Number</Box>
        </Grid>
      </Grid>
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
          Verify OTP
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label="OTP"
            name="otp"
            autoComplete="otp"
            autoFocus
            value={otp}
            onChange={(e) => {
              const input = e.target.value;
              const filteredInput = `${input.replace(/\D/g, "")}`;
              setOtp(filteredInput);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
