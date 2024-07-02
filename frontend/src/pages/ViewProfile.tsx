import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography, Avatar, TextField } from "@mui/material";
import useRequest from "../utils/requestHandler";
import host from "../utils/links";
import "./ViewProfile.css";

interface UserProfileType {
    user: number;
    bio: string;
    location_name: string;
    location_coords: string;
    date_of_birth: string;
    profile_picture: string;
}

const ViewProfile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfileType | null>(null);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [userName, setUserName] = useState<string>("");
    const [editableProfile, setEditableProfile] = useState<UserProfileType | null>(null);

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
            const response = await apiFetch("accounts/profile/create/", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editableProfile),
            });
            if (response.status === 200) {
                alert("Profile updated successfully");
                setProfile(editableProfile);
            } else {
                alert("Error updating the profile.");
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (editableProfile) {
            setEditableProfile({
                ...editableProfile,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handlePreview = () => {
        navigate(`/profile/${currentUserId}`);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Box className="profile-container">
            <Card className="profile-card">
                <CardContent>
                    {profile ? (
                        <div>
                            <Box className="profile-avatar-container">
                                <Avatar
                                    alt={userName}
                                    src={`${host}${profile.profile_picture}`}
                                    className="profile-avatar"
                                />
                            </Box>
                            <Typography variant="h4" component="div" className="profile-details">
                                {userName}
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
                                        label="Location"
                                        value={editableProfile?.location_name || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
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
                                        <Button variant="contained" color="primary" onClick={handleSave}>
                                            Save
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
        </Box>
    );
};

export default ViewProfile;
