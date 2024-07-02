import axios from "axios";
import { useEffect, useState } from "react";
import host from "../utils/links";
import Post from "./Post";
import { PostType } from "./Post";
import React from "react";
import "./viewPostsByCategory.css";
import { useLocation } from "react-router-dom";
import OfferFilter from "../components/offerFilter";
import FilterByLocation from "../components/filterByLocation";
export interface selectedOffersType {
  title: string;
}

const ViewPostByCategory: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const need = queryParams.get("need");
  const offer = queryParams.get("offer");
  const [postList, setPostList] = useState<PostType[]>([]);
  const [filteredPostList, setFilteredPostList] = useState<PostType[]>([]);
  const [selectedOffers, setSelectedOffers] = useState<selectedOffersType[]>(
    []
  );

  useEffect(() => {
    getPostList();
  }, [need]);

  useEffect(() => {
    filterPosts();
  }, [selectedOffers, postList]);

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

  const filterPosts = () => {
    if (selectedOffers.length === 0) {
      setFilteredPostList(postList);
    } else {
      let params: any = {};
      if (need) {
        params.need = need;
      }
      if (selectedOffers.length > 0) {
        let offers = selectedOffers.map((offer) => offer.title);
        axios
          .get(`${host}/posts/filter/`, {
            params: { need: need, offer: offers },
          })
          .then((res) => setFilteredPostList(res.data))
          .catch((error) => alert(error));
        console.log(filteredPostList);
      }
    }
  };

  return (
    <div>
      {!offer && need && (
          <OfferFilter
            selectedOffers={selectedOffers}
            setSelectedOffers={setSelectedOffers}
          />
        )}
      {filteredPostList &&
      <FilterByLocation filterState={[filteredPostList, setFilteredPostList]}/>}

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
          <h3> No osts Available</h3>
        ) : (
          filteredPostList.map((post) => (
            <div key={post.id}>
              <Post post={post} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewPostByCategory;
