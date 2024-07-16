import React from "react";
import Category from "../components/category";
import axios from "axios";
import { useEffect, useState } from "react";
import host from "../utils/links";
import { Box, Container, Stack, Typography } from "@mui/material";
import useRequest from "../utils/requestHandler";

export interface TopNeedType {
  need: string;
  count: number;
}
export interface TopOfferType {
  offer: string;
  count: number;
}

export interface TopTradeType {
  offer: string;
  need: string;
  count: number;
}

const HomePage: React.FC = () => {
  const [topNeed, setTopNeed] = useState<TopNeedType[]>([]);

  useEffect(() => {
    getTopNeed();
  }, []);

  const getTopNeed = async () => {
    axios
      .get(`${host}/posts/need/`)
      .then((res) => setTopNeed(res.data))
      .then(() => console.log())
      .catch((error) => alert(error));
  };

  const [topOffer, setTopOffer] = useState<TopOfferType[]>([]);

  useEffect(() => {
    getTopOffer();
  }, []);

  const getTopOffer = async () => {
    axios
      .get(`${host}/posts/offer/`)
      .then((res) => setTopOffer(res.data))
      .catch((error) => alert(error));
  };

  const [topTrade, setTopTrade] = useState<TopTradeType[]>([]);

  useEffect(() => {
    getTopTrade();
  }, []);

  const getTopTrade = async () => {
    axios
      .get(`${host}/posts/trade/`)
      .then((res) => setTopTrade(res.data))
      .catch((error) => alert(error));
  };

  const [firstName, setFirstName] = useState("");
  const apiFetch = useRequest();

  useEffect(() => {
    getAndSetUser();
  }, []);

  const getAndSetUser = async () => {
    const response = await apiFetch("accounts/get-current-user-id", {
      method: "GET",
    });

    setFirstName(response.user_name.split(" ")[0]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          height: "200px",
          width: "100%",
          marginBottom: "2rem",
          marginLeft: 0,
          marginRight: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{ maxHeight: "200px", maxWidth: "200px" }}
            alt="The house from the offer."
            src="./../public/hammer.jpg"
          />
          <Stack>
            <Typography
              variant="h4"
              noWrap
              gutterBottom
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                paddingLeft: 5,
                fontWeight: "bold",
              }}
            >
              Welcome back, {firstName}
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, paddingLeft: 5 }}
            >
              Start searching for individuals with various skills and trades to
              connect and exchange services!
            </Typography>
          </Stack>
        </Stack>
      </Container>
      <Category title="Most Needed Talents" popularListings={topNeed} />
      <Category title="Most Offered Talents" popularListings={topOffer} />
      <Category title="Most Popular Trades" popularListings={topTrade} />
    </div>
  );
};

export default HomePage;
