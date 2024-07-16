import React from "react";
import Category from "../components/category";
import axios from "axios";
import { useEffect, useState } from "react";
import host from "../utils/links";
import useRequest from "../utils/requestHandler";
import { useAuth } from "../utils/AuthService";
import Post from "./Post";
import { PostType } from "./Post";
import "./Post.css";
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
    console.log("logged in", loggedIn)
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
    suggestedPosts();
  }, [loggedIn]);

  const getTopTrade = async () => {
    axios
      .get(`${host}/posts/trade/`)
      .then((res) => setTopTrade(res.data))
      .catch((error) => alert(error));
  };

  const suggestedPosts = async () => {
    /*
    axios
      .get(`${host}/posts/suggested-posts/`)
      .then((res) => console.log(res.data))
      .catch((error) => alert(error)); */
    if(loggedIn){
      const response = await apiFetch(`posts/suggested-posts`,  { method: "GET", });
      response !== 'User unauthorized' && setPostList(response)
      }
    }

  return (
    <div>
      <div className="post-container ">
        {postList.length > 0 && (
          <div>
            <h3>Suggested Posts:</h3>
            {postList.map((post) => (
              <div key={post.id}>
                <Post post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Category title="Most Needed Talents" popularListings={topNeed} />
        <Category title="Most Offered Talents" popularListings={topOffer} />
        <Category title="Most Popular Trades" popularListings={topTrade} />
      </div>
    </div>
  );
};

export default HomePage;
