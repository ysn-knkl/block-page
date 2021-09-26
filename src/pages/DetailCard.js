import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import React, { useEffect, useState } from "react";
import { useParams,useHistory } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import Header from "../components/Header";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";


export default function DetailCard() {
  const { id } = useParams();
  const [cardList, setCardList] = useState([]);
  const { getCards, currentUser, deleteCard } = useAuth();
  const history = useHistory();

  useEffect(() => {
    getCards("cardId", id).then(function (result) {
      setCardList(result);
    });
  }, []);

   const handleDelete = async () => {
      await deleteCard(cardList[0].cardId)
    history.push("/")
  }

  function handleUpdate(){
    history.push(`/update-blog/${cardList[0].cardId}`)

  }

  
  return (
    <React.Fragment>
      <Header />
      {cardList[0] && (
        <main>
          {/* Hero unit */}
          <Container sx={{ py: 2 }} maxWidth="md">
            <Typography
              variant="h2"
              sx={{
                color: "#046582",
                textTransform: "uppercase",
                margin: "15px",
                fontFamily: "Helvetica Neue",
                fontWeight: "bold",
              }}
            >
              -----DETAILS-----
            </Typography>
            {/* End hero unit */}
            <Grid align="center">
              <Grid item md={12}>
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
                    alt="random"
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
                    <Typography variant="subtitle2" color="text.secondary">
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
            {cardList[0].email === currentUser.email &&
            
            <Box container display="flex" justifyContent="space-around">
              <Button
              
                variant="contained"
                sx={{
                  px:5,
                  m:2,
                }}
                onClick={handleUpdate}
              >
                update
              </Button>
              <Button variant="contained"
              color="secondary"
               sx={{
                  px:5,
                  m:2
                }}
                onClick={handleDelete}>delete</Button>
            </Box>
            
            }
          </Container>
        </main>
      )}
    </React.Fragment>
  );
}
