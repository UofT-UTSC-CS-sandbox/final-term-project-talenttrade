import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthService";

const AuthRedirect = ({ redirectPath }: { redirectPath: string }) => {
  const { refreshToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      return await refreshToken();
    };

    const getLoggedInStatus = async () => {
      const loggedIn = await checkLoggedIn();
      if (loggedIn!) {
        navigate(redirectPath);
      }
    };

    getLoggedInStatus();
  }, [refreshToken, navigate, redirectPath]);

  return null;
};

export default AuthRedirect;
