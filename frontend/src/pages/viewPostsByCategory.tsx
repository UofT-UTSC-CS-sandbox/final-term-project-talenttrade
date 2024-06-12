import axios from "axios";
import { useEffect, useState } from "react";
import host from "../utils/links";
import Post from "./Post";
import { PostType } from "./Post";
import React from "react";
import "./viewPostsByCategory.css";
import { useLocation } from "react-router-dom";

// interface PostListProps {
//   need?: string;
//   offer?: string;
// }

const ViewPostByCategory: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const need = queryParams.get("need");
  const offer = queryParams.get("offer");
  const [postList, setPostList] = useState<PostType[]>([]);

  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = async () => {
    if (need && offer) {
      axios
        .get(`${host}/posts/post-trade/`, { params: { need, offer } })
        .then((res) => setPostList(res.data))
        .catch((error) => alert(error));
    } else if (need) {
      axios
        .get(`${host}/posts/post-need/`, { params: { need } })
        .then((res) => setPostList(res.data))
        .catch((error) => alert(error));
    } else if (offer) {
      axios
        .get(`${host}/posts/post-offer/`, { params: { offer } })
        .then((res) => setPostList(res.data))
        .catch((error) => alert(error));
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Showing results for:</h1>
        {need && offer ? (
          <h2> {`Need: ${need} \nOffer: ${offer}`} </h2>
        ) : need ? (
          <h2>{`Need: ${need}`}</h2>
        ) : (
          <h2> {`Offer: ${offer}`}</h2>
        )}
      </div>
      <div className="post-container ">
        {postList.length === 0 ? (
          <h3> No Posts Available</h3>
        ) : (
          postList.map((post) => (
            <div>
              <Post post={post} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewPostByCategory;
