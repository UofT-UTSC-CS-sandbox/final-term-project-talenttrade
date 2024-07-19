import { useCallback } from "react";
import { useAuth } from "./AuthService";
import host from "./links";
import { useNavigate } from "react-router-dom";

const useRequest = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  return useCallback(
    async (path: string, options = {}, contentType: string = "application/json") => {
      // Remove leading slash if exists
      const normalizedPath = path.startsWith("/") ? path.substring(1) : path;

      // Create headers and set default Content-Type
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": contentType,
      });

      // Remove Content-Type if it's form-data (it will be automatically set by the browser)
      if (contentType === "multipart/form-data") {
        headers.delete("Content-Type");
      }

      try {
        const response = await fetch(
          `${host}/${normalizedPath}`,
          Object.assign({}, options, {
            headers,
          })
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
        console.log("Error during request:", error);
        return null;
      }
    },
    [token]
  );
};

export default useRequest;
