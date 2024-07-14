import "./App.css";
import HomePage from "./pages/HomePage";
import TopBar from "./components/topbar";
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
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <div>
            <TopBar />
            <div style={{ marginTop: "60px" }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/MyListings" element={<ViewPost />} />
                <Route path="/CreatePost" element={<CreatePost />} />
                <Route path="/filter" element={<FilterBar />} />
                <Route path="/Chat/:otherUser" element={<Chat />} />
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
