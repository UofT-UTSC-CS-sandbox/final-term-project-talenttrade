import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TopBar from "./components/topbar";

function App() {
  return (
    <>
      <Router>
        <div>
          <TopBar />
          <div style={{ marginTop: "60px" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
