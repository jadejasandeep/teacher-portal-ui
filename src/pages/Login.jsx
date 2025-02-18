import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Container, Typography, Box, Link } from "@mui/material";
import React, { useState, useEffect } from 'react';

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const { login, token } = useAuth(); // ✅ Get token
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/dashboard", { replace: true }); // ✅ Redirect after login
    } catch (error) {
      alert("Invalid credentials! Try again.");
    }
  };

  // ✅ Redirect if user is already logged in
  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
        <Typography variant="h5" align="center">Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth label="Username" {...register("username")} error={!!errors.username} helperText={errors.username?.message} margin="normal" />
          <TextField fullWidth type="password" label="Password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} margin="normal" />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Login</Button>
        </form>
        <Typography align="center">
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </Typography>
      </Box>
    </Container>
  );
};

export default Login;
