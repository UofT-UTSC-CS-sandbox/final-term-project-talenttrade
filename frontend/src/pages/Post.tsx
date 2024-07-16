import React, { useEffect } from "react";
import { useState } from "react";
import useRequest from "../utils/requestHandler";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Box,
  Grid,
  Rating,
  CardActionArea,
} from "@mui/material";
import { UserProfileType } from "../pages/ViewProfile";
import { stringToColor } from "../components/topbar";
import { useAuth } from "../utils/AuthService";
export interface PostType {
  id: number;
  author_id: number;
  author_name: string;
  need: string;
  offer: string;
  description: string;
  published: Date;
  active: boolean;
}

export interface PostProps {
  post: PostType;
}

const descriptionLmt = 250;

const Post: React.FC<PostProps> = ({ post }) => {
  const [rating, setRating] = useState(0);
  const [numRatings, setNumRatings] = useState(0);
  const apiFetch = useRequest();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const { refreshToken } = useAuth();
  const [loggedIn, setLoggedIn] = useState<Boolean>();

  useEffect(() => {
    if (!loggedIn) {
      const getLoggedInStatus = async () => {
        try {
          const loggedIn = await refreshToken();
          setLoggedIn(loggedIn);
          console.log("User logged in:", loggedIn);
        } catch (error) {
          console.error("Error checking login status:", error);
        }
      };

      getLoggedInStatus();
    }
  }, [refreshToken]);

  useEffect(() => {
    getProfile();
    getAvgRating(post.author_id);
  }, [rating]);

  const getAvgRating = async (user_id: number) => {
    const response = await apiFetch(`ratings/avg/?receiver=${user_id}`, {
      method: "GET",
    });
    setRating(response.average);
    setNumRatings(response.numRatings);
  };

  const getProfile = async () => {
    const response = await apiFetch(`accounts/profile/${post.author_id}/`, {
      method: "GET",
    });
    setProfile(response);
  };

  return (
    <Card sx={{ minWidth: 270, maxWidth: 290 }}>
      <CardActionArea>
        <CardMedia sx={{ height: 140 }} image="." />
        <CardContent>
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Avatar
                alt={profile?.full_name}
                src={profile?.profile_picture}
                sx={{
                  width: 28,
                  height: 28,
                  backgroundColor: stringToColor(profile?.full_name || ""),
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                }}
              >
                {profile?.full_name.split(" ")[0][0]}
                {profile?.full_name.split(" ")[1][0]}
              </Avatar>
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                  fontSize: "0.9rem",
                }}
              >
                {`${profile?.full_name}`}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Rating
                value={rating}
                readOnly
                size="small"
                sx={{
                  "& .MuiRating-iconEmpty": {
                    color: "#FFD700",
                  },
                  paddingTop: "4px",
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{ fontSize: "0.7rem", paddingLeft: "4px", color: "grey" }}
              >
                {`(${numRatings})`}
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ paddingTop: "5px" }}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                  fontSize: "0.9rem",
                }}
              >
                <Box component="span" fontWeight="fontWeightBold">
                  Looking for:
                </Box>{" "}
                {post.need}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                  fontSize: "0.9rem",
                }}
              >
                <Box component="span" fontWeight="fontWeightBold">
                  Can offer:
                </Box>{" "}
                {post.offer}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                component="div"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                  fontSize: "0.9rem",
                }}
              >
                {`Description: ${post.description}`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Post;
