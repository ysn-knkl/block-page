import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { initialState } from "../utils/constant";
import { useHistory } from "react-router-dom";

export default function CardItem({ card = initialState.Card }) {
  const history = useHistory();
  function handleCart() {
    history.push(`/detail/${card.cardId}`);
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={card.imgLink}
        alt="img"
        onClick={handleCart}
      />
      <CardContent className="card-content"   sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}>
        <Typography variant="h6" sx={{ color: '#046582',textTransform: "uppercase", marginBottom: "10px", fontFamily:"Helvetica Neue", fontWeight: "bold"}} textAlign="left">
          {card.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{lineHeight: "50%"}} textAlign="left">
          {card.subheader}
        </Typography>
        <Typography variant="subtitle1"  textAlign="left" sx={{fontSize: "0.9rem"}}>
          {card.content}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="h6" color="text.secondary" textAlign="left">
          <AccountCircleIcon fontSize="medium" />
          {card.email}
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
  );
}
