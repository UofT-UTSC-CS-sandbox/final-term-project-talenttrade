import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../utils/requestHandler";
import CircularProgress from "@mui/material/CircularProgress";

const withProfileCheck = (WrappedComponent: React.ComponentType) => {
    const WithProfileCheck: React.FC = (props) => {
        const [loading, setLoading] = useState(true);
        const navigate = useNavigate();
        const apiFetch = useRequest();

        useEffect(() => {
            const checkProfile = async () => {
                const response = await apiFetch("accounts/profile/", { method: "GET" });
                if (!response.date_of_birth) {
                    navigate("/profile");
                } else {
                    setLoading(false);
                }
            };

            checkProfile();
        }, [navigate, apiFetch]);

        if (loading) {
            return <CircularProgress />;
        }

        return <WrappedComponent {...props} />;
    };

    return WithProfileCheck;
};

export default withProfileCheck;
