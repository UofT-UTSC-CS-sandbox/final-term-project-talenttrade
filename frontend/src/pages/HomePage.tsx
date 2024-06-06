import React from "react";
import Category from "../components/category";

const HomePage: React.FC = () => {
  //placeholder:
  const needed = [
    { trade: "Graphic Designer", numPopularTrades: 18 },
    { trade: "Plumber", numPopularTrades: 13 },
    { trade: "Web Developer", numPopularTrades: 8 },
  ];
  const offered = [
    { trade: "Web Developer", numPopularTrades: 25 },
    { trade: "Mechanic", numPopularTrades: 11 },
    { trade: "Wood Working", numPopularTrades: 10 },
  ];
  const trades = [
    { trade: ["Web Developer", "Graphic Designer"], numPopularTrades: 12 },
    { trade: ["Plumber", "Mechanic"], numPopularTrades: 7 },
    { trade: ["Wood Working", "Web Developer"], numPopularTrades: 4 },
  ];

  return (
    <div>
      <Category title="Most Needed Talents" popularListings={needed} />
      <Category title="Most Offered Talents" popularListings={offered} />
      <Category title="Most Popular Trades" popularListings={trades} />
    </div>
  );
};

export default HomePage;
