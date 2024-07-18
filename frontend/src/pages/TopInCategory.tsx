import axios from "axios";
import { useEffect, useState } from "react";
import host from "../utils/links";
import { Link } from "react-router-dom";
import "./TopInCategory.css";
import "./../components/category.css";
import useRequest from "../utils/requestHandler";

interface TopType {
  offer?: string;
  need?: string;
  count: number;
}
interface Category {
  category: string;
}

const TopInCategory: React.FC<Category> = ({ category }) => {
  const apiFetch = useRequest();
  const [top, setTop] = useState<TopType[]>([]);

  useEffect(() => {
    getTop();
  }, []);

  const getTop = async () => {
    const response = await apiFetch(`posts/${category}/`);
    setTop(response);
  };

  return (
    <div className="top-categories">
      <h1 className="title">
        {category == "trade"
          ? `Top Trades:\n`
          : category == "need"
          ? `Top Needs:\n`
          : `Top Offers:\n`}
      </h1>
      <div className="top-category">
        {
          <h1 className="category-cards">
            {top.map((top, index) => (
              <Link
                to={
                  category == "trade"
                    ? `/view-posts-by-category?need=${top.need}&offer=${top.offer}`
                    : category == "need"
                    ? `/view-posts-by-category?need=${top.need}`
                    : `/view-posts-by-category?offer=${top.offer}`
                }
                key={index}
                className="card-link"
              >
                <div className="card">
                  <div>
                    <div className="card-title">
                      {category == "trade"
                        ? `Need: ${top.need} \nOffer: ${top.offer}`
                        : category == "need"
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
      </div>
    </div>
  );
};

export default TopInCategory;
