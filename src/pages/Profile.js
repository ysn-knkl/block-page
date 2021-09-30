import React from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
} from "@mui/material";
import { initialState } from "../utils/constant";
import Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";

export default function CardItem({ card = initialState.Card }) {
  const {currentUser} = useAuth();

  return (
    <>
      <Header />
      <main>
        <Container sx={{ py: 2, my: "10%" }} maxWidth="xs" align="center">
          <Grid container justify="center">
            <Grid item md={12} xs={12}>
              <Box
                sx={{
                  backgroundColor: "white",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle2">Profile</Typography>
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    width="100"
                    height="100"
                    alt="profile"
                  />
                </Box>
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle2">Display NAme</Typography>
                  <Typography variant="h6">Not Found !</Typography>
                </Box>

                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle2">Email</Typography>
                  <Typography variant="h6">{currentUser.email}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}
