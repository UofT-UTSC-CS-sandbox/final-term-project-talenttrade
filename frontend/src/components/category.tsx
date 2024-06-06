import React from "react";
import { Link } from "react-router-dom";
import "./category.css"; // Import the CSS file

interface Listings {
  trade: string | string[];
  numPopularTrades: Number;
}

interface CategoryProps {
  title: string;
  popularListings: Listings[];
}

const Category: React.FC<CategoryProps> = ({ title, popularListings }) => {
  const top3 = popularListings.slice(0, 3);

  const formatTrade = (trade: string | string[]): string => {
    if (Array.isArray(trade)) {
      return `Need: ${trade[0]} \nOffer: ${trade[1]}`;
    }
    return trade;
  };

  return (
    <div>
      <h1 className="title">{title}</h1>
      <div className="category">
        <h1 className="cards">
          {top3.map((top, index) => (
            <a key={index} href={`/${top.trade}`}>
              <div className="card">
                <div>
                  <div className="card-title">{formatTrade(top.trade)}</div>
                  <div className="card-subheader">
                    {top.numPopularTrades.toString() + " posts"}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </h1>
        <Link to={`/${title}`} className="link">
          <button className="more-button">More</button>
        </Link>
      </div>
    </div>
  );
};

export default Category;
