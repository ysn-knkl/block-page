import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Alert
} from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();

export default function Signup() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("")

  async function handleSubmit(event) {
    event.preventDefault();

    try {
        setMessage("")
        setLoading(true)
        setError("")
       await resetPassword(emailRef.current.value)
       setMessage("Check your inbox for further instructions")
    } catch {
        setError("Failed to Reset Password")
    }
    setLoading(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <main>
      <Container sx={{ background: "white", marginTop: 8, height: "100%" }} maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Password Reset
          </Typography>
          {error && <Alert severity="warning" >{error}</Alert>}
          {message && <Alert severity="success" >{message}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              inputRef={emailRef}
              autoFocus
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Reset Password
            </Button>
            <Typography variant="subtitle1" color="text.secondary" align="center">
              
              <Link to="/login" variant="body2">
                {"Log In"}
              </Link>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="center">
                  Need an account?{" "}
              <Link to="/signup" variant="body2">
                {"Sign Up"}
              </Link>
            </Typography>

          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      </main>
    </ThemeProvider>
  );
}
