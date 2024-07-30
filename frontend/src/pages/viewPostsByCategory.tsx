import { useEffect, useState } from "react";
import Post from "./Post";
import { PostType } from "./Post";
import React from "react";
import "./viewPostsByCategory.css";
import { useLocation } from "react-router-dom";
import OfferFilter from "../components/offerFilter";
import FilterByLocation from "../components/filterByLocation";
import useRequest from "../utils/requestHandler";
import withProfileCheck from "../hoc/withProfileCheck";
import Ratings from "../components/ratings";

export interface selectedOffersType {
  title: string;
}

const ViewPostByCategory: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const need = queryParams.get("need");
  const offer = queryParams.get("offer");
  const show = queryParams.get("show");
  const [distance, setDistance] = useState<number | number[]>(-1);
  const [rating, setRating] = useState("-1");
  const [userList, setUserList] = useState<String[]>([]);
  const [postList, setPostList] = useState<PostType[]>([]);
  const [filteredPostList, setFilteredPostList] = useState<PostType[]>([]);
  const [selectedOffers, setSelectedOffers] = useState<selectedOffersType[]>(
    []
  );
  const apiFetch = useRequest();

  useEffect(() => {
    getUserIds(rating);
  }, [rating]);

  useEffect(() => {
    getPostList();
  }, [need]);

  useEffect(() => {
    if (postList) {
      filterPosts(distance, rating);
    }
  }, [selectedOffers, postList, distance, userList]);

  const getUserIds = async (rating: string) => {
    try {
      let users;
      if (rating === "-1") {
        users = await apiFetch("accounts/users/", {
          method: "GET",
        });
      } else {
        users = await apiFetch(`ratings/users-with-rating/${rating}`, {
          method: "GET",
        });
        console.log(users);
      }
      setUserList(users);
    } catch (error) {
      console.error("Error fetching user IDs:", error);
    }
  };

  const getPostList = async () => {
    let response;
    if (need && offer) {
      response = await apiFetch(`posts/post-trade/${need}/${offer}`);
    } else if (need) {
      if (show == "true") {
        response = await apiFetch(`posts/post-offer/${need}/${show}`);
      } else {
        response = await apiFetch(`posts/post-need/${need}`);
      }
    } else if (offer) {
      response = await apiFetch(`posts/post-offer/${offer}/${show}`, {
        method: "GET",
      });
    }
    setPostList(response);
  };

  const filterPosts = async (distance: number | number[], rating: string) => {
    if (selectedOffers.length === 0 && distance == -1 && rating == "-1") {
      setFilteredPostList(postList);
    } else {
      let offers = selectedOffers.map((offer) => offer.title);
      const post_ids = postList.map((post) => post.id);
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
            post_ids
          )}/${JSON.stringify(offers)}/${
            profile.location_coords
          }/${JSON.stringify(userList)}`,
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
          {show == "true" && (
            <OfferFilter
              selectedOffers={selectedOffers}
              setSelectedOffers={setSelectedOffers}
            />
          )}
          {filteredPostList && show == "true" && (
            <FilterByLocation value={distance} setValue={setDistance} />
          )}
          {show == "true" && <Ratings rating={rating} setRating={setRating} />}
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

export default withProfileCheck(ViewPostByCategory);
