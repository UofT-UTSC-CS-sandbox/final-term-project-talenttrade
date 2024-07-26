import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useRequest from "../utils/requestHandler";
import withProfileCheck from "../hoc/withProfileCheck";

import host from "../utils/links";
import "./CreatePost.css";
import {
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Alert,
  AlertColor,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const CreatePost: React.FC = () => {
  const [need, setNeed] = useState("");
  const [offer, setOffer] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [applicants, setApplicants] = useState(0);
  const [active, setActive] = useState(true);
  const [postId, setPostId] = useState(-1);
  const [create, setCreate] = useState(true);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState<AlertColor>("success");
  const [userId, setUserId] = useState(-1);
  const [userName, setUserName] = useState("");
  const [profileLocation, setProfileLocation] = useState("");

  const navigate = useNavigate();
  const locationRouter = useLocation();
  const apiFetch = useRequest();

  const INPUT_LEN = 30;

  useEffect(() => {
    setCreate(locationRouter.state.create);
    getAndSetUser();
    if (!locationRouter.state.create) getAndSetPost(locationRouter.state.id);
  }, []);

  const getAndSetUser = async () => {
    const response = await apiFetch("accounts/get-current-user-id", {
      method: "GET",
    });
    setUserId(response.user_id);
    setUserName(response.user_name);
    getAndSetLocation(response.user_id);
  };

  const getAndSetLocation = async (id: number) => {
    const response = await apiFetch(`accounts/profile/${id}`, {
      method: "GET",
    });
    setProfileLocation(response.location_name);
  };

  const formatText = (text: string) => {
    const words = text.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    const capitalizedString = capitalizedWords.join(" ");

    return capitalizedString;
  };

  const getAndSetPost = async (id: number) => {
    axios
      .get(`${host}/posts/${id}`)
      .then((res) => {
        setPostId(res.data.id);
        setNeed(res.data.need);
        setOffer(res.data.offer);
        setDescription(res.data.description);
        setLocation(res.data.location);
        setApplicants(res.data.applicants);
        setActive(res.data.active);
      })
      .catch((error) => alert(error));
  };

  const createPost = async () => {
    const formData = new FormData();
    formData.append("author_id", userId.toString());
    formData.append("author_name", userName);
    formData.append("need", formatText(need));
    formData.append("offer", formatText(offer));
    formData.append("description", description);
    formData.append("location", location);
    formData.append("applicants", applicants.toString());
    formData.append("active", active.toString());
    if (photo) {
      formData.append("photo", photo);
    }

    axios
      .post(`${host}/posts/`, formData)
      .then((res) => { })
      .catch((error) => alert(error));

    setMessage("Post Created Successfully!");
    setSnackSeverity("success");
    setOpenSnackbar(true);

    navigate("/");
  };

  const editPost = async () => {
    const formData = new FormData();
    formData.append("author_id", userId.toString());
    formData.append("author_name", userName);
    formData.append("need", formatText(need));
    formData.append("offer", formatText(offer));
    formData.append("description", description);
    formData.append("location", location);
    formData.append("applicants", applicants.toString());
    formData.append("active", active.toString());
    if (photo) {
      formData.append("photo", photo);
    }

    axios
      .put(`${host}/posts/${postId}/`, formData)
      .then((res) => { })
      .catch((error) => alert(error));

    setMessage("Post Edited Successfully!");
    setSnackSeverity("success");
    setOpenSnackbar(true);

    navigate("/MyListings");
  };

  const handleCheckboxChange = () => {
    if (location == profileLocation) setLocation("");
    else setLocation(profileLocation);
  };

  const handleSubmit = () => {
    if (
      !(need.trim() && offer.trim() && description.trim() && location.trim())
    ) {
      setMessage("Please fill in all fields");
      setSnackSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (need.length > INPUT_LEN) {
      setMessage(
        "Needed talent cannot be longer than " + INPUT_LEN + " characters"
      );
      setSnackSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    if (offer.length > INPUT_LEN) {
      setMessage(
        "Offered talent cannot be longer than " + INPUT_LEN + " characters"
      );
      setSnackSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    if (location.length > INPUT_LEN) {
      setMessage("Location cannot be longer than " + INPUT_LEN + " characters");
      setSnackSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (create) createPost();
    else editPost();
  };

  const handleCloseSnackbar = (event: any) => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="create_post_container">
        <form>
          <Card className="create_post">
            <CardContent>
              <Typography gutterBottom variant="h5" sx={{ paddingBottom: 2 }}>
                {create ? "Create" : "Edit"} Post
              </Typography>
              <div>
                <FormControl className="input_field" sx={{ paddingBottom: 1 }}>
                  <InputLabel htmlFor="need_input">Needed Talent</InputLabel>
                  <OutlinedInput
                    id="need_input"
                    type="text"
                    required
                    label="Needed Talent"
                    placeholder="Please enter the needed talent"
                    value={need}
                    onChange={(e) => {
                      setNeed(e.target.value);
                    }}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className="input_field" sx={{ paddingBottom: 1 }}>
                  <InputLabel htmlFor="offer_input">Offered Talent</InputLabel>
                  <OutlinedInput
                    id="offer_input"
                    type="text"
                    required
                    label="Offered Talent"
                    placeholder="Please enter the offered talent"
                    value={offer}
                    onChange={(e) => {
                      setOffer(e.target.value);
                    }}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className="input_field" sx={{ paddingBottom: 1 }}>
                  <InputLabel htmlFor="description_input">
                    Description
                  </InputLabel>
                  <OutlinedInput
                    id="description_input"
                    type="text"
                    required
                    multiline
                    label="Description"
                    placeholder="Please enter the task description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className="input_field" sx={{ paddingBottom: 1 }}>
                  <InputLabel htmlFor="location_input">Location</InputLabel>
                  <OutlinedInput
                    id="location_input"
                    type="text"
                    required
                    label="Location"
                    placeholder="Please enter the task location"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </FormControl>
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={location == profileLocation}
                      onChange={handleCheckboxChange}
                      name="is_exact_location"
                      color="primary"
                    />
                  }
                  label={"Use " + profileLocation}
                  className="input_field"
                />
              </div>
              <div>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-photo"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPhoto(e.target.files[0]);
                    }
                  }}
                />
                <label htmlFor="upload-photo">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{ marginBottom: "16px" }}
                  >
                    Upload Photo
                  </Button>
                  {photo && <span>{photo.name}</span>}
                </label>
              </div>
            </CardContent>
            <Button onClick={handleSubmit} variant="contained">
              {create ? "Post" : "Edit"}
            </Button>
          </Card>
        </form>
      </div>

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
    </>
  );
};

export default withProfileCheck(CreatePost);
