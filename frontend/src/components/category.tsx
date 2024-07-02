import React from "react";
import { Link } from "react-router-dom";
import "./category.css"; // Import the CSS file
import { TopNeedType, TopOfferType, TopTradeType } from "../pages/HomePage";

interface CategoryProps {
  title: string;
  popularListings: TopNeedType[] | TopOfferType[] | TopTradeType[];
}

const Category: React.FC<CategoryProps> = ({ title, popularListings }) => {
  const top3 = popularListings.slice(0, 3);

  const isTopNeedType = (item: any): item is TopNeedType =>
    "need" in item && !("offer" in item);
  const isTopTradeType = (item: any): item is TopTradeType =>
    "offer" in item && "need" in item;

  return (
    <div>
      <h1 className="title">{title}</h1>
      <div className="category">
        {
          <h1 className="cards">
            {top3.map((top, index) => (
              <Link
                to={
                  isTopTradeType(top)
                    ? `/view-posts-by-category?need=${top.need}&offer=${top.offer}&show=${false}`
                    : isTopNeedType(top)
                    ? `/view-posts-by-category?need=${top.need}&show=${false}`
                    : `/view-posts-by-category?offer=${top.offer}&show=${false}`
                }
                key={index}
                className="card-link"
              >
                <div className="card">
                  <div>
                    <div className="card-title">
                      {isTopTradeType(top)
                        ? `Need: ${top.need} \nOffer: ${top.offer}`
                        : isTopNeedType(top)
                        ? `Need: ${top.need}`
                        : `Offer: ${top.offer}`}
                    </div>
                    <div className="card-subheader">
                      {top.count.toString() + " posts"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </h1>
        }

        <Link
          to={
            title == "Most Popular Trades"
              ? `MostPopularTrades`
              : title == "Most Needed Talents"
              ? `MostNeededTalents`
              : `MostOfferedTalents`
          }
          className="link"
        >
          <button className="more-button">More</button>
        </Link>
      </div>
    </div>
  );
};

export default Category;
