import { useCallback } from "react";
import { useAuth } from "./AuthService";
import host from "./links";
import { useNavigate } from "react-router-dom";

const useRequest = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  return useCallback<any>(
    async (path: string, options = {}) => {
      // Remove leading slash if exists
      const normalizedPath = path.startsWith("/") ? path.substring(1) : path;
      try {
        const response = await fetch(
          `${host}/${normalizedPath}`,
          Object.assign({}, options, {
            headers: new Headers({
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }),
          }),
        );

        // If user is unauthorized, send them back to login page
        if (response.status === 401) {
          navigate("/login");
          return;
        }

        // Handle all other errors
        if (!response.ok) {
          throw new Error(await response.text());
        }

        return await response.json();
      } catch (error) {
        console.log("Error during request");

        return null;
      }
    },
    [token],
  );
};

export default useRequest;
