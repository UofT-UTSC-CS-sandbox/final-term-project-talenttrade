import React from "react";
import Category from "../components/category";
import { useEffect, useState } from "react";
import host from "../utils/links";
import withProfileCheck from "../hoc/withProfileCheck";
import useRequest from "../utils/requestHandler";
import { useAuth } from "../utils/AuthService";
import { PostType } from "./Post";
import { Box, Container, Stack, Typography } from "@mui/material";

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
  const { refreshToken } = useAuth();
  const [topNeed, setTopNeed] = useState<TopNeedType[]>([]);
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  const [postList, setPostList] = useState<PostType[]>([]);
  const apiFetch = useRequest();

  useEffect(() => {
    getTopNeed();
  }, []);
  useEffect(() => {
    console.log("logged in", loggedIn);
    if (!loggedIn) {
      const getLoggedInStatus = async () => {
        try {
          const loggedIn = await refreshToken();
          setLoggedIn(loggedIn);
          console.log("User logged in:", loggedIn);
        } catch (error) {
          console.error("Error checking login status:", error);
        }
      };

      getLoggedInStatus();
    }
  }, [refreshToken]);

  const getTopNeed = async () => {
    const response = await apiFetch(`posts/need/`);
    setTopNeed(response);
  };

  const [topOffer, setTopOffer] = useState<TopOfferType[]>([]);

  useEffect(() => {
    getTopOffer();
  }, []);

  const getTopOffer = async () => {
    const response = await apiFetch(`posts/offer/`);
    setTopOffer(response);
  };

  const [topTrade, setTopTrade] = useState<TopTradeType[]>([]);

  useEffect(() => {
    getTopTrade();
    suggestedPosts();
  }, [loggedIn]);

  const getTopTrade = async () => {
    const response = await apiFetch(`posts/trade/`);
    setTopTrade(response);
  };

  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    getAndSetUser();
  }, []);

  const getAndSetUser = async () => {
    const response = await apiFetch("accounts/get-current-user-id", {
      method: "GET",
    });
    if (response) {
      setFirstName(response.user_name.split(" ")[0]);
    }
  };

  const suggestedPosts = async () => {
    if (loggedIn) {
      const response = await apiFetch(`posts/suggested-posts`, {
        method: "GET",
      });
      console.log(response);
      response && setPostList(response);
    }
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
            src="./hammer.jpg"
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
      <Category title="Suggested Posts" suggestedPostList={postList} />
      <Category title="Most Needed Talents" popularListings={topNeed} />
      <Category title="Most Offered Talents" popularListings={topOffer} />
      <Category title="Most Popular Trades" popularListings={topTrade} />
    </div>
  );
};

export default withProfileCheck(HomePage);
