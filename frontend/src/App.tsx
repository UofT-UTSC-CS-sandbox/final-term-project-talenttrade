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
                <Route path="login/" element={<LogInPage />} />
                <Route path="signup/" element={<SignupPage />} />
                <Route path="/MyListings" element={<ViewPost />} />
                <Route path="/CreatePost" element={<CreatePost />} />
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
