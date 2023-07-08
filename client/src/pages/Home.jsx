import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    window.localStorage.removeItem("userID");
    navigate("/");
    toast.success("Logged out successfully!");
  };
  return (
    <div>
      <button onClick={handleClick} className="btn">
        Logout
      </button>
    </div>
  );
}

export default Home;
