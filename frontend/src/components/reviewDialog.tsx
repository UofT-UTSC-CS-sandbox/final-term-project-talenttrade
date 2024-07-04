import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
  Rating,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import useRequest from "../utils/requestHandler";
import axios from "axios";
import host from "../utils/links";
import "./reviewDialog.css";

interface dialogProps {
  receiverId: number;
  receiverName: string;
  open: boolean;
  handleClose: () => void;
}

const ReviewDialog: React.FC<dialogProps> = ({
  receiverId,
  receiverName,
  open,
  handleClose,
}) => {
  const [rating, setRating] = React.useState<number | null>(0);
  const [ratingId, setRatingId] = React.useState(0);
  const [review, setReview] = React.useState("");
  const [reviewerId, setId] = React.useState(-1);

  const [message, setMessage] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackSeverity, setSnackSeverity] =
    React.useState<AlertColor>("success");

  const apiFetch = useRequest();

  React.useEffect(() => {
    setReview("");
    if (open) getAndSetUser();
  }, [open]);

  const getAndSetUser = async () => {
    const response = await apiFetch("accounts/get-current-user-id", {
      method: "GET",
    });
    setId(response.user_id);
    getAndSetRating(response.user_id);
  };

  const getAndSetRating = async (raterId: number) => {
    const res = await apiFetch(
      `ratings/rating/?rater=${raterId}&receiver=${receiverId}`,
      { method: "GET" }
    );
    if (res.length != 0) {
      setRating(res[0].rating);
      setRatingId(res[0].id);
    } else setRating(0);
  };

  const createRating = async () => {
    const ratingObj = {
      rater: reviewerId,
      receiver: receiverId,
      rating: rating,
    };
    axios.post(`${host}/ratings/`, ratingObj);
  };

  const editRating = async () => {
    const ratingObj = {
      rater: reviewerId,
      receiver: receiverId,
      rating: rating,
    };
    axios.put(`${host}/ratings/${ratingId}/`, ratingObj);
  };

  const createReview = async () => {
    const reviewObj = {
      reviewer: reviewerId,
      receiver: receiverId,
      review: review,
    };
    axios.post(`${host}/reviews/`, reviewObj);
  };

  const handleSubmit = () => {
    if (rating && rating > 0) {
      if (ratingId != 0) editRating();
      else createRating();
    } else {
      setMessage("Please enter a rating");
      setSnackSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (review) createReview();

    setMessage("Review Submitted!");
    setSnackSeverity("success");
    setOpenSnackbar(true);
    handleClose();
  };

  const handleCloseSnackbar = (event: any) => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Review {receiverName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {ratingId ? "Update your rating" : "Leave a rating"} and post an
            optional review of {receiverName} to let others know how you feel.
          </DialogContentText>
          <br />
          <Typography component="legend">Rating</Typography>
          <Rating
            name="simple-controlled"
            size="large"
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue);
            }}
            sx={{ paddingBottom: 2 }}
          />
          <Typography>Review</Typography>
          <FormControl className="input_field" sx={{ paddingBottom: 1 }}>
            <OutlinedInput
              type="text"
              multiline
              placeholder="Click to write a review"
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
              }}
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            sx={{ backgroundColor: "green" }}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackSeverity} onClose={handleCloseSnackbar}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReviewDialog;
