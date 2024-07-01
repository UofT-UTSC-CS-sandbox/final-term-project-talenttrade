import React from "react";
import Category from "../components/category";
import axios from "axios";
import { useEffect, useState } from "react";
import host from "../utils/links";

//TEMP
import ReviewDialog from "../components/reviewDialog";

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

  //TEMP review dialog code//
  const [openDialog, setOpenDialog] = useState(false);
  //review dialog code//

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Category title="Most Needed Talents" popularListings={topNeed} />
      <Category title="Most Offered Talents" popularListings={topOffer} />
      <Category title="Most Popular Trades" popularListings={topTrade} />
      
      {/* TEMP review dialog code */}
      <button onClick={() => setOpenDialog(true)}>temp</button>
      <ReviewDialog receiverId={3} receiverName="NAME" open={openDialog} handleClose={() => setOpenDialog(false)}/>
      {/* review dialog code */}
    </div>
  );
};

export default HomePage;
