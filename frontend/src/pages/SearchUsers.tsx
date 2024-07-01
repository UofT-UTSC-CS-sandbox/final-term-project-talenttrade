import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import host from "../utils/links";
import User, { UserType } from "../components/user";
import { Box, Grid } from "@mui/material";

const SearchUser: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const [userList, setUserList] = useState<UserType[]>([]);

  useEffect(() => {
    getUserList();
  }, [username]);

  const getUserList = async () => {
    axios
      .get(`${host}/accounts/search-user/`, { params: { username } })
      .then((res) => setUserList(res.data))
      .catch((error) => alert(error));
  };

  return (
    <div>
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

export default SearchUser;
