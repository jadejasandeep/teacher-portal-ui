import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Container, Typography, Box , Link} from "@mui/material";
import React, { useState, useEffect } from 'react';

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: "", email: "", firstName: "", lastName: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!userData.username || !userData.email || !userData.firstName || !userData.lastName || !userData.password) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await signupUser(userData);
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      alert("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" sx={{ mt: 3 }}>Sign Up</Typography>
      <Box sx={{ mt: 3, mb: 3 }}>
        <TextField label="Username" fullWidth margin="normal" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
        <TextField label="Email" fullWidth margin="normal" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
        <TextField label="First Name" fullWidth margin="normal" value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
        <TextField label="Last Name" fullWidth margin="normal" value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSignup} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </Box>
      <Typography align="center">
        Already have an account? <Link href="/login">Login</Link>
      </Typography>
    </Container>
  );
};

export default Signup;
