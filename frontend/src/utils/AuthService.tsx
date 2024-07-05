import React, { useEffect } from "react";
import host from "./links";

interface IAuthContext {
  token: string | null;
  refresh: string | null;
  userId: string | null;
  logIn: (username: string, password: string) => Promise<boolean>;
  logOut: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = React.createContext<IAuthContext>({
  token: null,
  refresh: null,
  userId: null,
  logIn: async () => false,
  logOut: () => { },
  refreshToken: async () => false,
});

const AuthProvider = ({ children }: any) => {
  const [token, setToken] = React.useState<string | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [refresh, setRefresh] = React.useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("final-term-project-talenttrade.token");
    const savedRefresh = localStorage.getItem("final-term-project-talenttrade.refresh");
    const savedUserId = localStorage.getItem("final-term-project-talenttrade.userId");

    if (savedToken) {
      setToken(savedToken);
    }
    if (savedRefresh) {
      setRefresh(savedRefresh);
    }
    if (savedUserId) {
      setUserId(savedUserId);
    }
  }, []);

  const logIn = async (username: string, password: string) => {
    try {
      const data = { username, password };

      const response = await fetch(`${host}/accounts/token/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return false;
      }

      const { access, refresh } = await response.json();

      setToken(access);
      setRefresh(refresh);
      setUserId(username);

      localStorage.setItem("final-term-project-talenttrade.token", access);
      localStorage.setItem("final-term-project-talenttrade.refresh", refresh);
      localStorage.setItem("final-term-project-talenttrade.userId", username);

      return true;
    } catch (error) {
      console.error("Error during login request:", error);
      return false;
    }
  };

  const logOut = async () => {
    try {
      const response = await fetch(`${host}/accounts/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ refresh }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      localStorage.removeItem("final-term-project-talenttrade.token");
      localStorage.removeItem("final-term-project-talenttrade.refresh");
      localStorage.removeItem("final-term-project-talenttrade.userId");

      setToken(null);
      setRefresh(null);
      setUserId(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }

    return true;
  };

  const refreshToken = async () => {
    if (token === null || refresh === null) {
      return false;
    }

    try {
      const response = await fetch(`${host}/accounts/token/refresh/`, {
        method: "POST",
        body: JSON.stringify({ refresh }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        return false;
      } else if (!response.ok) {
        throw new Error(await response.text());
      } else {
        const data = await response.json();
        setToken(data.access);
        localStorage.setItem("final-term-project-talenttrade.token", data.access);
        return true;
      }
    } catch (error) {
      console.error("Token refresh failed", error);
      return false;
    }
  };

  const value = {
    token,
    refresh,
    userId,
    logIn,
    logOut,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export default AuthProvider;
