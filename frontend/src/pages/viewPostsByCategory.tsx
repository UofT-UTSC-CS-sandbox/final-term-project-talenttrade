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
import useRequest from "../utils/requestHandler";
export interface selectedOffersType {
  title: string;
}

const ViewPostByCategory: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const need = queryParams.get("need");
  const offer = queryParams.get("offer");
  const show = queryParams.get("show");
  const [distance, setDistance] = useState(-1);
  const [showBool, setShowBool] = useState(false);
  const [postList, setPostList] = useState<PostType[]>([]);
  const [filteredPostList, setFilteredPostList] = useState<PostType[]>([]);
  const [selectedOffers, setSelectedOffers] = useState<selectedOffersType[]>(
    []
  );
  const apiFetch = useRequest();

  useEffect(() => {
    if (show === "true") {
      setShowBool(true);
    }
    getPostList();
  }, [need, showBool]);

  useEffect(() => {
    filterPosts(distance);

  }, [selectedOffers, postList, distance]);

  const getPostList = async () => {
    if (need && offer) {
      axios
        .get(`${host}/posts/post-trade/`, { params: { need, offer } })
        .then((res) => setPostList(res.data))
        .catch((error) => alert(error));
    } else if (need) {
      if (showBool) {
        const response = await apiFetch(`posts/post-offer/${need}/${show}`, {
          method: "GET",
        });
        setPostList(response);
      } else {
        axios
          .get(`${host}/posts/post-need/`, { params: { need } })
          .then((res) => setPostList(res.data))
          .catch((error) => alert(error));
      }
    } else if (offer) {
      axios
        .get(`${host}/posts/post-offer/${offer}/${show}`)
        .then((res) => setPostList(res.data))
        .catch((error) => alert(error));
    }
  };

  const filterPosts = async (distance: number) => {
    console.log("the current list before filtering", filteredPostList);
    if (selectedOffers.length === 0 && distance == -1) {
      setFilteredPostList(postList);
    } else {
      let offers = selectedOffers.map((offer) => offer.title);
      try {
        const userId = await apiFetch("accounts/get-current-user-id", {
          method: "GET",
        });
        const profile = await apiFetch(
          userId.id ? `accounts/profile/${userId}/` : `accounts/profile/`,
          { method: "GET" }
        );
        const response = await apiFetch(
          `posts/filter/${distance.toString()}/${JSON.stringify(
            postList
          )}/${JSON.stringify(offers)}/${profile.location_coords}`,
          { method: "GET" }
        );
        setFilteredPostList(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div>
      <div className="Filtering-Container">
        <div className="Filtering">
          {showBool && (
            <OfferFilter
              selectedOffers={selectedOffers}
              setSelectedOffers={setSelectedOffers}
            />
          )}
          {filteredPostList && showBool && (
            <FilterByLocation distanceState={[distance, setDistance]} />
          )}
        </div>
      </div>

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
          filteredPostList &&
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
