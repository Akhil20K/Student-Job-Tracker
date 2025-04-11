import React from "react";
import { useNavigate } from "react-router-dom";
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Welcome to Job Tracker</h1>
        <div className="button-container">
          <button className="home-btn" onClick={() => navigate("/add")}>
            Add Application
          </button>
          <button className="home-btn" onClick={() => navigate("/list")}>
            Show Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
