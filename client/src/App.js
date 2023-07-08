import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Check />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

function Check() {
  const userID = window.localStorage.getItem("userID");
  React.useEffect(() => {
    if (!userID) {
      alert("Please login or sign up first.");
    }
  }, [userID]);

  return userID ? <Home /> : <Navigate to="/" />;
}
