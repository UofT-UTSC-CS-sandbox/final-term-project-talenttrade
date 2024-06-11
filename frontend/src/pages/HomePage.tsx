import React from "react";
import Category from "../components/category";
import axios from "axios";
import { useEffect, useState } from "react";
import host from "../utils/links";
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
  //placeholder:
  // const needed = [
  //   { trade: "Graphic Designer", numPopularTrades: 18 },
  //   { trade: "Plumber", numPopularTrades: 13 },
  //   { trade: "Web Developer", numPopularTrades: 8 },
  // ];
  // const offered = [
  //   { trade: "Web Developer", numPopularTrades: 25 },
  //   { trade: "Mechanic", numPopularTrades: 11 },
  //   { trade: "Wood Working", numPopularTrades: 10 },
  // ];
  // const trades = [
  //   { trade: ["Web Developer", "Graphic Designer"], numPopularTrades: 12 },
  //   { trade: ["Plumber", "Mechanic"], numPopularTrades: 7 },
  //   { trade: ["Wood Working", "Web Developer"], numPopularTrades: 4 },
  // ];

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

  return (
    <div>
      <Category title="Most Needed Talents" popularListings={topNeed} />
      <Category title="Most Offered Talents" popularListings={topOffer} />
      <Category title="Most Popular Trades" popularListings={topTrade} />
    </div>
  );
};

export default HomePage;
