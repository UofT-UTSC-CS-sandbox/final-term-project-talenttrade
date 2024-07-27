import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Rating,
  Grid,
  IconButton,
  Divider,
  Stack,
  Card,
  CardMedia,
  CardContent,
  ButtonProps,
  styled,
  CardActionArea,
} from "@mui/material";
import useRequest from "../utils/requestHandler";
import host from "../utils/links";
import "./ViewProfile.css";
import { stringToColor } from "../components/topbar";
import UserProfileType from "../interfaces/User";
import { PostType } from "./Post";
import ReviewCard from "../components/reviewCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Review } from "./ViewProfile";

// export interface PostType {
//     id: number;
//     author_id: number;
//     author_name: string;
//     need: string;
//     offer: string;
//     description: string;
//     location: string;
//     published: Date;
//     active: boolean;
//   }

const MessageButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#000000"),
  backgroundColor: "#000000",
  border: 0,
  "&:hover": {
    backgroundColor: "#424242",
    border: 0,
  },
}));

const ViewPost: React.FC = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const [rating, setRating] = useState(0);
  const [numRatings, setNumRatings] = useState(0);
  const apiFetch = useRequest();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getPost = async () => {
    const response = await apiFetch(`posts/post/${postId}/`, { method: "GET" });
    setPost(response);
  };

  useEffect(() => {
    getPost();
  }, [postId]);

  useEffect(() => {
    if (post) {
      getProfile(post.author_id);
      getAvgRating(post.author_id);
      getReviews(post.author_id, 1);
    }
  }, [post]);

  const getAvgRating = async (user_id: number) => {
    const response = await apiFetch(`ratings/avg/?receiver=${user_id}`, {
      method: "GET",
    });
    setRating(response.average);
    setNumRatings(response.numRatings);
  };

  const getProfile = async (author_id: number) => {
    const response = await apiFetch(`accounts/profile/${author_id}/`, {
      method: "GET",
    });
    setProfile(response);
  };

  const getReviews = async (id: number, pageNum: number) => {
    const response = await apiFetch(
      `reviews/all/?receiver=${id}&page=${pageNum}`,
      { method: "GET" }
    );
    if (!response.length) {
      setReviews([]);
      setTotalPages(0);
    } else {
      setReviews(response);
      setTotalPages(response[0].pages);
    }
  };

  const handleBackPage = () => {
    if (page != 1 && post?.author_id) {
      setPage(page - 1);
      getReviews(post?.author_id, page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages && post?.author_id) {
      setPage(page + 1);
      getReviews(post?.author_id, page + 1);
    }
  };

  const navigateChat = () => {
    if (post) {
      navigate(`/Chat/${post.author_id}`);
    }
  };

  const viewOtherUser = () => {
    if (post) {
      navigate(`/profile/${post.author_id}`);
    }
  };

  return (
    <Box
      className="post-container"
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {post && profile ? (
        <Grid container sx={{ maxWidth: "1100px", paddingTop: "1rem" }}>
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
                fontSize: "1.5rem",
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
                fontSize: "1.5rem",
              }}
            >
              <Box component="span" fontWeight="fontWeightBold">
                Can offer:
              </Box>{" "}
              {post.offer}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={6}>
              <Box sx={{ width: "80%" }}>
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{
                    paddingTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={viewOtherUser}
                    sx={{ padding: 0, width: 70, height: 70 }}
                  >
                    <Avatar
                      alt={profile?.full_name}
                      src={`${host}${profile?.profile_picture}`}
                      sx={{
                        width: 70,
                        height: 70,
                        backgroundColor: stringToColor(
                          profile?.full_name || ""
                        ),
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {profile?.full_name.split(" ")[0][0]}
                      {profile?.full_name.split(" ")[1][0]}
                    </Avatar>
                  </IconButton>
                  <Stack>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                        fontSize: "1.2rem",
                      }}
                    >
                      {`${profile?.full_name}`}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                        fontSize: "1rem",
                        color: "grey",
                      }}
                    >
                      located in: {profile.location_name}
                    </Typography>
                    <Stack direction="row">
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
                    </Stack>
                  </Stack>
                </Stack>

                <Grid item sx={{ maxHeight: "30rem", paddingTop: "2rem" }}>
                  <Card elevation={6} variant="outlined">
                    <CardMedia
                      component="img"
                      height="400"
                      width="400"
                      image={ post.photo && post.photo.startsWith("http") ? post.photo : `${host}${post.photo}`}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sx={{ paddingTop: "2rem" }}>
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {`About this trade:`}
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{
                      maxWidth: "100%",
                      fontSize: "1rem",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {post.description}
                  </Typography>
                </Grid>
              </Box>

              <Box sx={{ width: "60%" }}>
                <Stack>
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                      fontSize: "1rem",
                    }}
                  >
                    Interested in this trade?
                  </Typography>
                  <MessageButton
                    variant="outlined"
                    disableElevation
                    sx={{ width: 200 }}
                    onClick={navigateChat}
                  >
                    Send Message
                  </MessageButton>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    className="profile-detail"
                    sx={{ paddingTop: 2 }}
                  >
                    Reviews for {profile.full_name}:
                  </Typography>

                  {reviews.length ? (
                    <Stack
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={handleBackPage}
                        disabled={page == 1}
                        sx={{ width: "40px", height: "40px" }}
                      >
                        <KeyboardArrowUpIcon />
                      </IconButton>
                      {reviews.map((review) => (
                        <div className="review-card" style={{ width: "90%" }}>
                          <ReviewCard
                            review={review.review}
                            date={review.published}
                          />
                        </div>
                      ))}
                      <IconButton
                        onClick={handleNextPage}
                        disabled={page >= totalPages}
                        sx={{
                          width: "40px",
                          height: "40px",
                          marginTop: "1rem",
                        }}
                      >
                        <KeyboardArrowDownIcon />
                      </IconButton>
                    </Stack>
                  ) : (
                    <div>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="profile-detail"
                      >
                        There are no reviews
                      </Typography>
                    </div>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Loading post...
        </Typography>
      )}
    </Box>
  );
};

export default ViewPost;
