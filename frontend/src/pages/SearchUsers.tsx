import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import User, { UserType } from "../components/user";
import { Box, Grid } from "@mui/material";
import useRequest from "../utils/requestHandler";
import withProfileCheck from "../hoc/withProfileCheck";
import Ratings from "../components/ratings";

const SearchUser: React.FC = () => {
  const location = useLocation();
  const apiFetch = useRequest();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const [userList, setUserList] = useState<UserType[]>([]);
  const [rating, setRating] = useState<string>("-1");
  const [userIds, setUserIds] = useState<string[]>([]);

  useEffect(() => {
    getUserIds(rating);
  }, [rating]);

  useEffect(() => {
    if (username) {
      getUserList();
    }
  }, [username, userIds]);

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
      }
      setUserIds(users);
    } catch (error) {
      console.error("Error fetching user IDs:", error);
    }
  };

  const getUserList = async () => {
    const res = await apiFetch(
      `accounts/search-user/${username}/${JSON.stringify(userIds)}`,
      {
        method: "GET",
      }
    );
    setUserList(res);
  };

  return (
    <div style={{ marginLeft: "35px" }}>
      <Ratings rating={rating} setRating={setRating} />
      <div className="header">
        <h1>Showing results for:</h1>
        <h2> {username} </h2>
      </div>
      <Box sx={{ flexGrow: 1, maxWidth: 1250 }}>
        {userList.length === 0 ? (
          <h3>No results found for "{username}"</h3>
        ) : (
          <Grid container spacing={5}>
            {userList.map((user) => (
              <Grid item key={user.id} xs={6} sm={4} md={3} lg={2.4} xl={2.4}>
                <User user={user} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default withProfileCheck(SearchUser);
