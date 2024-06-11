import axios from "axios";
import { useEffect, useState } from "react";
import host from "../utils/links";
import "./Post.css";

interface TopNeedType {
  need: string;
  count: number;
}
interface TopOfferType {
  offer: string;
  count: number;
}

interface TopTradeType {
  offer: string;
  need: string;
  count: number;
}

const ViewPost: React.FC = () => {
  const [topNeed, setTopNeed] = useState<TopNeedType[]>([]);

  useEffect(() => {
    getTopNeed();
  }, []);

  const getTopNeed = async () => {
    axios
      .get(`${host}/posts/need/`)
      .then((res) => setTopNeed(res.data))
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
      <h1> Categories </h1>
      <div>
        <h2> Top Needs </h2>
        <div>
          {topNeed.map((top, index) => (
            <div key={index}>
              <div> {top.need}</div>
              <div> {top.count} posts </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2> Top Offers </h2>
        <div>
          {topOffer.map((top, index) => (
            <div key={index}>
              <div> {top.offer}</div>
              <div> {top.count} posts </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2> Top Trades </h2>
        <div>
          {topTrade.map((top, index) => (
            <div key={index}>
              <div> Need: {top.need}</div>
              <div> Offer: {top.offer}</div>
              <div> {top.count} posts </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
