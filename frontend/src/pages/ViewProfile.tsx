import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography, Avatar, TextField, List, ListItem, ListItemText, Checkbox, FormControlLabel, Snackbar, CircularProgress, Rating } from "@mui/material";
import useRequest from "../utils/requestHandler";
import host from "../utils/links";
import "./ViewProfile.css";
import ReviewCard from "../components/reviewCard";

interface UserProfileType {
    user: number;
    full_name: string;
    bio: string;
    location_name: string;
    location_coords: string;
    date_of_birth: string;
    profile_picture: string;
    is_exact_location: boolean;
}

interface LocationResult {
    name: string;
    lat: string;
    lng: string;
}

interface Review {
  review: string;
  published: string;
  pages: number;
}

const ViewProfile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfileType | null>(null);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [userName, setUserName] = useState<string>("");
    const [editableProfile, setEditableProfile] = useState<UserProfileType | null>(null);
    const [locationResults, setLocationResults] = useState<LocationResult[]>([]);
    const [useExactLocation, setUseExactLocation] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const apiFetch = useRequest();

    const getAndSetUser = async () => {
        const response = await apiFetch("accounts/get-current-user-id", { method: "GET" });
        setCurrentUserId(response.user_id);
        setUserName(response.user_name);
    };

    useEffect(() => {
        getProfile();
        getAndSetUser();
        if (userId){
          getAvgRating(parseInt(userId));
          getReviews(parseInt(userId), 1);
        }
    }, [userId]);

    const getProfile = async () => {
        const response = await apiFetch(userId ? `accounts/profile/${userId}/` : `accounts/profile/`, { method: "GET" });
        setProfile(response);
        if (!userId) {
            setEditableProfile(response);
        }
    };

    const handleSave = async () => {
        if (editableProfile) {
            setLoading(true);
            if (editableProfile.is_exact_location) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const lat = position.coords.latitude.toString();
                    const lng = position.coords.longitude.toString();
                    const updatedProfile = {
                        ...editableProfile,
                        location_coords: `${lat},${lng}`,
                    };
                    await saveProfile(updatedProfile);
                }, () => {
                    alert("Error getting the exact location.");
                    setLoading(false);
                });
            } else {
                await requeryCityCoordinates(editableProfile);
            }
        }
    };

    const requeryCityCoordinates = async (profileData: UserProfileType) => {
        const response = await apiFetch(`worldcities/search/?q=${profileData.location_name}`, { method: "GET" });
        const results = response.slice(0, 1); // Get the top result
        if (results.length > 0) {
            const location = results[0];
            profileData.location_coords = `${location.lat},${location.lng}`;
        }
        await saveProfile(profileData);
    };

    const saveProfile = async (profileData: UserProfileType) => {
        const response = await apiFetch("accounts/profile/create/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });
        setLoading(false);
        setSnackbarOpen(true);
        setProfile(profileData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (editableProfile) {
            setEditableProfile({
                ...editableProfile,
                [name]: value,
            });

            if (name === 'location_name') {
                fetchLocationResults(value);
            }
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editableProfile) {
            setEditableProfile({
                ...editableProfile,
                is_exact_location: e.target.checked,
            });
        }
    };

    const fetchLocationResults = useCallback(async (query: string) => {
        if (query.length < 2) {
            setLocationResults([]);
            return;
        }

        const response = await apiFetch(`worldcities/search/?q=${query}`, { method: "GET" });
        setLocationResults(response);
    }, [apiFetch]);

    const handleLocationSelect = (location: LocationResult) => {
        if (editableProfile) {
            setEditableProfile({
                ...editableProfile,
                location_name: location.name,
                location_coords: `${location.lat},${location.lng}`,
                is_exact_location: false,
            });
            setLocationResults([]);
        }
    };

    const getAvgRating = async (id: number) => {
      const response = await apiFetch(`ratings/avg/?receiver=${id}`, {method: "GET"});
      setRating(response.average);
    }

    const getReviews = async (id: number, pageNum: number) => {
      const response = await apiFetch(`reviews/all/?receiver=${id}&page=${pageNum}`, {method: "GET"});
      if (!response.length){
        setReviews([])
        setTotalPages(0)
      }
      else{
        setReviews(response);
        setTotalPages(response[0].pages);
      }
    }

    const handleBackPage = () => {
      if (page != 1 && userId){
        setPage(page-1)
        getReviews(parseInt(userId), page-1)
      }
    }

    const handleNextPage = () => {
      if (page < totalPages && userId){
        setPage(page+1)
        getReviews(parseInt(userId), page+1)
      }
    }

    const handlePreview = () => {
        navigate(`/profile/${currentUserId}`);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box className="profile-container">
            <Card className="profile-card">
                <CardContent>
                    {profile ? (
                        <div>
                            <Box className="profile-avatar-container">
                                <Avatar
                                    alt={profile.full_name}
                                    src={`${host}${profile.profile_picture}`}
                                    className="profile-avatar"
                                />
                            </Box>
                            <Typography variant="h4" component="div" className="profile-details">
                                {profile.full_name}
                            </Typography>
                            {!userId ? (
                                <>
                                    <TextField
                                        name="bio"
                                        label="Bio"
                                        value={editableProfile?.bio || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        multiline
                                        rows={4}
                                    />
                                    <TextField
                                        name="location_name"
                                        label="City/Town"
                                        value={editableProfile?.location_name || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    {locationResults.length > 0 && (
                                        <List className="location-results-list">
                                            {locationResults.map((result, index) => (
                                                <ListItem key={index} button onClick={() => handleLocationSelect(result)}>
                                                    <ListItemText primary={result.name} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    )}
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={editableProfile?.is_exact_location || false}
                                                onChange={handleCheckboxChange}
                                                name="is_exact_location"
                                                color="primary"
                                            />
                                        }
                                        label="Use exact location"
                                    />
                                    <TextField
                                        name="date_of_birth"
                                        label="Date of Birth"
                                        type="date"
                                        value={editableProfile?.date_of_birth || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <Box className="profile-actions">
                                        <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
                                            {loading ? <CircularProgress size={24} /> : "Save"}
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={handlePreview}>
                                            Preview
                                        </Button>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Typography variant="body1" color="textPrimary" className="profile-detail profile-bio">
                                        Bio: {profile.bio}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" className="profile-detail">
                                        Location: {profile.location_name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" className="profile-detail">
                                        Date of Birth: {profile.date_of_birth}
                                    </Typography>
                                    <Typography variant="body1" color="textPrimary" className="profile-detail" sx={{paddingTop: 2}}>
                                        Rating
                                    </Typography>
                                    <Rating
                                      name="read-only"
                                      size="medium"
                                      value={rating}
                                      readOnly
                                    />
                                    <Typography variant="body1" color="textPrimary" className="profile-detail" sx={{paddingTop: 2}}>
                                        Reviews
                                    </Typography>
                                    {reviews.length ? 
                                      <div>
                                        {reviews.map((review) => (
                                          <div className="review-card">
                                            <ReviewCard review={review.review} date={review.published}/>
                                          </div>
                                        ))}
                                      </div>
                                    :
                                      <div>
                                        <Typography variant="body2" color="textSecondary" className="profile-detail">
                                            There are no reviews
                                        </Typography>
                                      </div>
                                    }
                                    
                                    <Box className="profile-actions">
                                        <Button variant="contained" color="primary" onClick={handleBackPage} disabled={page == 1}>
                                          Back
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleNextPage} disabled={page >= totalPages}>
                                          Next
                                        </Button>
                                    </Box>
                                    {currentUserId === parseInt(userId) && (
                                        <Box className="profile-actions">
                                            <Button variant="contained" color="primary" onClick={handleBack}>
                                                Back to Edit
                                            </Button>
                                        </Box>
                                    )}
                                </>
                            )}
                        </div>
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            Loading profile...
                        </Typography>
                    )}
                </CardContent>
            </Card>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Profile updated successfully"
            />
        </Box>
    );
};

export default ViewProfile;
