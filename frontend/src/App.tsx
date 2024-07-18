import "./App.css";
import HomePage from "./pages/HomePage";
import TopBar from "./components/topbar.tsx";
import SignupPage from "./pages/SignupPage";
import LogInPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ViewPost from "./pages/ViewPost";
import CreatePost from "./pages/CreatePost";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./utils/AuthService";
import ViewPostByCategory from "./pages/viewPostsByCategory";
import TopInCategory from "./pages/TopInCategory";
import FilterBar from "./components/filterBar";
import SearchUser from "./pages/SearchUsers";
import ViewProfile from "./pages/ViewProfile";
import { useState } from "react";

function App() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchFocusChange = (focused: boolean) => {
    setIsSearchFocused(focused);
  };

  return (
    <>
      <Router>
        <AuthProvider>
          <div>
            <TopBar onSearchFocusChange={handleSearchFocusChange} />
            {isSearchFocused && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  zIndex: 1,
                }}
              ></div>
            )}
            <div style={{ marginTop: "60px" }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/MyListings" element={<ViewPost />} />
                <Route path="/CreatePost" element={<CreatePost />} />
                <Route path="/filter" element={<FilterBar />} />
                <Route
                  path="/view-posts-by-category"
                  Component={ViewPostByCategory}
                />
                <Route
                  path="/MostPopularTrades"
                  element={<TopInCategory category="trade" />}
                />
                <Route
                  path="/MostNeededTalents"
                  element={<TopInCategory category="need" />}
                />
                <Route
                  path="/MostOfferedTalents"
                  element={<TopInCategory category="offer" />}
                />
                <Route path="/search-users" Component={SearchUser} />
                <Route path="/profile/:userId" element={<ViewProfile />} />
                <Route path="/profile" element={<ViewProfile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
