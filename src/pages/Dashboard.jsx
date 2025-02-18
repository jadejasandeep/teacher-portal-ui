import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import { getUserNameFromToken } from "../services/api";

const Dashboard = () => {
  const userName = getUserNameFromToken();
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
        <Typography variant="h5">Welcome, {userName || "User"}!</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/students")} sx={{ mt: 2 }}>Manage My Students</Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/teachers")} sx={{ mt: 2, ml: 2 }}>View All Teachers</Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
