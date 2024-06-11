import "./App.css";
import SignupPage from "./pages/SignupPage";
import LogInPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./utils/AuthService";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <div>
            <div style={{ marginTop: "60px" }}>
              <Routes>
                <Route path="login/" element={<LogInPage />} />
                <Route path="signup/" element={<SignupPage />} />
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