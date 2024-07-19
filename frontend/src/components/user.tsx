import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box, CardActionArea, Grid } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Rating from "@mui/material/Rating";
import useRequest from "../utils/requestHandler";
import { useNavigate } from "react-router-dom";
import UserProfileType from "../interfaces/User";
import host from "../utils/links";

export interface UserType {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface UserProps {
  user: UserType;
}

const User: React.FC<UserProps> = ({ user }) => {
  const [rating, setRating] = useState(0);
  const apiFetch = useRequest();
  const navigate = useNavigate();
  const [numRatings, setNumRatings] = useState(0);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    getAvgRating(user.id);
    getProfile(user.id);
  }, [user.id]); // Only run when user.id changes

  const getAvgRating = async (user_id: number) => {
    try {
      const response = await apiFetch(`ratings/avg/?receiver=${user_id}`, {
        method: "GET",
      });
      setRating(response.average);
      setNumRatings(response.numRatings);
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };

  const getProfile = async (user_id: number) => {
    try {
      const response = await apiFetch(`accounts/profile/${user_id}/`, {
        method: "GET"
      });
      setProfilePic(response.profile_picture);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const viewOtherUser = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <Card
      sx={{
        width: 200,
      }}
      onClick={viewOtherUser}
    >
      <CardActionArea>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%", minHeight: 250 }}
        >
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingTop="15px"
          >
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                width: "50%",
                height: "auto",
                aspectRatio: "1",
                fontSize: "1.5rem",
              }}
              alt={user.first_name}
              src={`${host}${profilePic}`}
            />
          </Grid>
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CardContent
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                }}
              >
                {`${user.first_name} ${user.last_name}`}
              </Typography>
              <Typography
                noWrap
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                  paddingBottom: "10px",
                }}
              >
                {`@${user.username}`}
              </Typography>
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  value={rating}
                  readOnly
                  size="small"
                  sx={{
                    "& .MuiRating-iconEmpty": {
                      color: "#FFD700",
                    },
                  }}
                />
                <Box>{`(${numRatings})`}</Box>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default User;
