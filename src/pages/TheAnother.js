import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardItem from "../components/CardItem";
import { useAuth } from "../utils/AuthContext";

const TheAnother = () => {
  const [cardList, setCardList] = useState([]);
  const { getCards } = useAuth();

  useEffect(() => {
    getCards("cardCategory","TheAnother").then(function (result) {
      setCardList(result);
    });
  }, [getCards]);

  return (
    <>
      <main>
      <Container sx={{ py: 2 }} maxWidth="xl" align="center">
        <Grid container spacing={3}>
          {cardList &&
            cardList.map((card, i) => (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                <CardItem card={card} />
              </Grid>
            ))}
        </Grid>
      </Container>
      </main>
    </>
  );
};

export default TheAnother;
