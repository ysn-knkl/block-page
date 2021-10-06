import React, { useRef, useState, useEffect } from "react";
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
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { uid } from "uid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { successToastify, failToastify } from "../utils/customToastify";

const theme = createTheme();

export default function Signup() {
  const titleRef = useRef();
  const imgLinkRef = useRef();
  const contentRef = useRef();
  const cardCategoryRef = useRef();
  const [cardCategory, setCardCategory] = useState("");
  const { getCards, currentUser, updateCard } = useAuth();
  const history = useHistory();

  const { id } = useParams();
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    getCards("cardId", id).then(function (result) {
      setCardList(result);
    });
  }, [getCards,id]);

  function handleUpdate(e) {
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
      id: cardList[0].id,
      cardId: uid(15),
      email: currentUser.email,
      cardCategory: cardCategoryRef.current.value,
      avatarName: "X",
      title: titleRef.current.value,
      subheader: date,
      imgLink: imgLinkRef.current.value,
      content: contentRef.current.value,
    };
    try {
      updateCard(newCard);
      successToastify("Updated Successfully");
    } catch {
      failToastify("Updated Failed");
    }
    history.push("/");
  }

  function handleChange(e) {
    setCardCategory(e.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Grid container justifyContent="center">
          {cardList[0] && (
            <>
              <CssBaseline />
              <Grid item lg={3} md={6} sm={12} xs={12}>
                <Container sx={{ py: 2 }}>
                  <Grid align="center">
                    <Grid item >
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={cardList[0].imgLink}
                          sx={{minHeight:"200px"}}
                          alt="img"
                        />
                        <CardContent
                          className="card-content"
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#046582",
                              textTransform: "uppercase",
                              margin: "15px",
                              fontFamily: "Helvetica Neue",
                              fontWeight: "bold",
                            }}
                          >
                            {cardList[0].title}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            {cardList[0].subheader}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontSize: "0.9rem" }}
                            textAlign="left"
                          >
                            {cardList[0].content}
                          </Typography>
                        </CardContent>
                        <CardContent>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            textAlign="left"
                          >
                            <AccountCircleIcon fontSize="medium" />
                            {cardList[0].email}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton aria-label="share">
                            <ChatBubbleOutlineIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                </Container>
              </Grid>
           
              <Grid item lg={3}>
                <Container
                  sx={{ background: "white", marginTop: 2 }}
                  maxWidth="xs"
                >
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="h1" variant="h5" sx={{ py: 2 }}>
                      Update Card
                    </Typography>
                    <Box component="form" onSubmit={handleUpdate}>
                      <InputLabel id="select-label">Category</InputLabel>
                      <Select
                        required
                        fullWidth
                        id="select-label"
                        labelId="select-label"
                        defaultValue={cardList[0].cardCategory}
                        value={cardCategory}
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
                        defaultValue={cardList[0].title}
                        label="Title"
                        name="text"
                        inputRef={titleRef}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="imgLink"
                        defaultValue={cardList[0].imgLink}
                        label="Link"
                        type="url"
                        name="imgLink"
                        inputRef={imgLinkRef}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="content"
                        defaultValue={cardList[0].content}
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
                        Update
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </Grid>
            </>
          )}
        </Grid>
      </main>
    </ThemeProvider>
  );
}
