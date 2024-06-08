import axios from 'axios';
import { useState, useEffect } from 'react';

import host from '../utils/links';
import './CreatePost.css';
import { Card, CardContent, Typography, Button, FormControl, InputLabel, OutlinedInput, Snackbar, Alert, AlertColor } from '@mui/material';

export default function CreatePost () {

  const [need, setNeed] = useState("");
  const [offer, setOffer] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [applicants, setApplicants] = useState(0);
  const [active, setActive] = useState(true);
  const [id, setId] = useState(-1);
  const [create, setCreate] = useState(true);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState<AlertColor>('success');

  const INPUT_LEN = 30;

  useEffect(() => {
    console.log("use effect");
    // check if its an edit or create
    // if its edit then set all above
    if (!create) {
      setNeed("test");
      setOffer("test");
      setDescription("test");
      setLocation("test");
      setApplicants(0);
      setActive(true);
      setId(1);
    }
  }, [])

  const createPost = async () => {
    const post = {
      authour_id: 0, // temp
      authour_name: "DEFAULT_NAME", // temp
      need: need,
      offer: offer,
      description: description,
      location: location,
      applicants: applicants,
      active: active
    }

    axios.post(`${host}/posts/`, post)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => alert(error));

    setMessage("Post Created Successfully!");
    setSnackSeverity('success');
    setOpenSnackbar(true);
    //go back
  }

  const editPost = async () => {
    const post = {
      authour_id: 0, // temp
      authour_name: "DEFAULT_NAME", // temp
      need: "test",
      offer: offer,
      description: description,
      location: location,
      applicants: applicants,
      active: active
    }

    axios.put(`${host}/posts/${id}`, post, {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }})
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => alert(error));

    setMessage("Post Edited Successfully!");
    setSnackSeverity('success');
    setOpenSnackbar(true);
    //go back
  }

  const handleSubmit = () => {
    if (!(need.trim() && offer.trim() && description.trim() && location.trim())) {
      setMessage("Please fill in all fields");
      setSnackSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (need.length > INPUT_LEN) {
      setMessage("Needed talent cannot be longer than "+INPUT_LEN+" characters");
      setSnackSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    if (offer.length > INPUT_LEN) {
      setMessage("Offered talent cannot be longer than "+INPUT_LEN+" characters");
      setSnackSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    if (location.length > INPUT_LEN) {
      setMessage("Location cannot be longer than "+INPUT_LEN+" characters");
      setSnackSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    // console.log(need + offer + description + location)

    if (create)
      createPost();
    else
      editPost();
  }

  const handleCloseSnackbar = (event:any) =>{
    setOpenSnackbar(false);
  }
  
  return (
    <>
    <div className="create_post_container">
      <form>
        <Card className='create_post'>
          <CardContent>
            <Typography gutterBottom variant="h5" sx={{paddingBottom: 2}}>
              {create ? "Create" : "Edit"} Post
            </Typography>
            <div>
              <FormControl className="input_field" sx={{paddingBottom: 1}}>
                <InputLabel htmlFor="need_input">Needed Talent</InputLabel>
                <OutlinedInput
                  id="need_input"
                  type="text"
                  required
                  label="Needed Talent"
                  placeholder="Please enter the needed talent"
                  value={need}
                  onChange={(e) => { setNeed(e.target.value); }}
                  />
              </FormControl>
            </div>
            <div>
              <FormControl className="input_field" sx={{paddingBottom: 1}}>
                <InputLabel htmlFor="offer_input">Offered Talent</InputLabel>
                <OutlinedInput
                  id="offer_input"
                  type="text"
                  required
                  label="Offered Talent"
                  placeholder="Please enter the offered talent"
                  value={offer}
                  onChange={(e) => { setOffer(e.target.value); }}
                  />
              </FormControl>
            </div>
            <div>
              <FormControl className="input_field" sx={{paddingBottom: 1}}>
                <InputLabel htmlFor="description_input">Description</InputLabel>
                <OutlinedInput
                  id="need_idescription_inputnput"
                  type="text"
                  required
                  multiline
                  label="Description"
                  placeholder="Please enter the task description"
                  value={description}
                  onChange={(e) => { setDescription(e.target.value); }}
                  />
              </FormControl>
            </div>
            <div>
              <FormControl className="input_field" sx={{paddingBottom: 1}}>
                <InputLabel htmlFor="location_input">Location</InputLabel>
                <OutlinedInput
                  id="location_input"
                  type="text"
                  required
                  label="Location"
                  placeholder="Please enter the task location"
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); }}
                  />
              </FormControl>
            </div>
          </CardContent>
          <Button onClick={handleSubmit} variant="contained">{create ? "Post" : "Edit"}</Button>
        </Card>
      </form>
    </div>

    <Snackbar autoHideDuration={6000} anchorOrigin={{vertical:'top', horizontal:'right'}} open={openSnackbar} onClose={handleCloseSnackbar}>
      <Alert severity={snackSeverity} onClose={handleCloseSnackbar}>
        {message}
      </Alert>
    </Snackbar>
    </>
  )
}