import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserNameFromToken } from "../services/api";

function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const userName = getUserNameFromToken();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography align="left" variant="h6" sx={{ flexGrow: 1 }}>
          Teacher Portal
        </Typography>
        {token ? (
          <>
            <Typography sx={{ marginRight: 2 }}>Welcome, {userName}</Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
