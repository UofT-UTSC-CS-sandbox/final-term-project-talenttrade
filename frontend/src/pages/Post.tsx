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
  IconButton,
  CardHeader,
  Menu,
  MenuItem,
} from "@mui/material";
import UserProfileType from "../interfaces/User";
import { stringToColor } from "../components/topbar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import host from "../utils/links";
export interface PostType {
  id: number;
  author_id: number;
  author_name: string;
  need: string;
  offer: string;
  description: string;
  location: string;
  published: Date;
  active: boolean;
}

export interface PostProps {
  post: PostType;
  myPost?: Boolean;
  postList?: PostType[];
  setPostList?: (updatedList: PostType[]) => void;
}

const Post: React.FC<PostProps> = ({
  post,
  myPost = false,
  postList,
  setPostList,
}) => {
  const [rating, setRating] = useState(0);
  const [numRatings, setNumRatings] = useState(0);
  const apiFetch = useRequest();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const deleteButton = async (id: number) => {
    if (setPostList && postList) {
      axios
        .delete(`${host}/posts/${id}/`)
        .then((res) => {
          if (res.status === 204) {
            alert("the Post was deleted successfully");
            setPostList(postList.filter((post) => post.id !== id));
          } else alert("Error deleting the post.");
        })
        .catch((error) => alert(error));
    }
  };

  const navigateEdit = (id: number) => {
    navigate("/CreatePost", { state: { create: false, id: id } });
  };

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

  const recordClick = async (postId: number) => {
    const response = await apiFetch(`posts/record-click/${postId}`, {
      method: "GET",
    });
    console.log(response);
  };

  return (
    <Card sx={{ minWidth: 270, maxWidth: 290 }}>
      {myPost && (
        <CardHeader
          avatar={
            <Avatar
              alt={profile?.full_name}
              src={`${host}${profile?.profile_picture}`}
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
          }
          action={
            <IconButton aria-label="settings" onClick={handleOpenUserMenu}>
              <MoreVertIcon />
            </IconButton>
          }
          title="Me"
        ></CardHeader>
      )}
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key={"Edit"} onClick={() => navigateEdit(post.id)}>
          <Typography textAlign="center">{"Edit"}</Typography>
        </MenuItem>
        <MenuItem key={"Delete"} onClick={() => deleteButton(post.id)}>
          <Typography textAlign="center">{"Delete"}</Typography>
        </MenuItem>
      </Menu>
      <CardActionArea
        onClick={() => {
          recordClick(post.id);
          navigate(`/view-a-post/${post.id}`);
        }}
      >
        <CardMedia sx={{ height: 140 }} image="." />
        <CardContent>
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {!myPost && (
              <Grid container item xs={12}>
                <Grid item xs={2}>
                  <Avatar
                    alt={profile?.full_name}
                    src={`${host}${profile?.profile_picture}`}
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
                    sx={{
                      fontSize: "0.7rem",
                      paddingLeft: "4px",
                      paddingTop: "7px",
                      color: "grey",
                    }}
                  >
                    {`(${numRatings})`}
                  </Box>
                </Grid>
              </Grid>
            )}

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
            {myPost && (
              <Grid container item xs={12}>
                <Grid item xs={9}>
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
                    Posted on:{" "}
                    {new Date(post.published).toLocaleDateString("en-US")}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  {post.active ? (
                    <Typography
                      gutterBottom
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                        fontSize: "0.9rem",
                        color: "green",
                      }}
                    >
                      Active
                    </Typography>
                  ) : (
                    <Typography
                      gutterBottom
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                        fontSize: "0.9rem",
                        color: "#aa0000",
                      }}
                    >
                      Inactive
                    </Typography>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Post;
