import React, { useRef, useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { uid } from "uid";
import Header from "../components/Header";

const theme = createTheme();

export default function Signup() {
  const titleRef = useRef();
  const imgLinkRef = useRef();
  const contentRef = useRef();
  const cardCategoryRef = useRef();
  const [cardCategory, setCardCategory] = useState("");
  const dispatch = useDispatch();
  const { addCard, currentUser } = useAuth();
  const history = useHistory();

  
  function handleSubmit(e) {
    e.preventDefault();
    var dt = new Date();
    var date =
      dt.getFullYear() +
      "/" +
      (dt.getMonth() + 1 < 10 ? "0" : "") +
      (dt.getMonth() + 1) +
      "/" +
      (dt.getDate() < 10 ? "0" : "") +
      dt.getDate();

    let newCard = {
      cardId: uid(15),
      email: currentUser.email,
      cardCategory: cardCategoryRef.current.value,
      avatarName: "X",
      title: titleRef.current.value,
      subheader: date,
      imgLink: imgLinkRef.current.value,
      content: contentRef.current.value,
    };
    addCard(newCard);
    history.push("/")
    dispatch({ type: "ADD_ITEM", payload: newCard });
  }

  function handleChange(e) {
    setCardCategory(e.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main>
      <Container sx={{ background: "white", marginTop: 2, height: "100%" }} maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add Card
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={cardCategory}
              label="Age"
              required
              fullWidth
              autoFocus
              onChange={handleChange}
              inputRef={cardCategoryRef}
            >
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Camping">Camping</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="TheAnother">The Another</MenuItem>
            </Select>

            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="text"
              inputRef={titleRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="imgLink"
              label="Image URL"
              type="url"
              id="imgLink"
              inputRef={imgLinkRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="content"
              label="Content"
              type="text"
              id="content"
              multiline
              rows={15}
              inputRef={contentRef}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={false}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
      </main>
    </ThemeProvider>
  );
}
