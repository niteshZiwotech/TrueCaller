import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import api from "../api";
const Header = () => {
  const naviagate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await api.clearInstallationId();
    if(response?.data?.result){
      naviagate("/login");
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Search Number
          </Typography>
          <Button variant="outlined" color="inherit" onClick={(e) => handleLogout(e)}>
            Change Installation ID
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
