import React from "react";
import Navbar from "./Navbar";
import bannerImg from "./banner-globe.png";

const Home = () => {
  const logo = process.env.HOME_PAGE_IMAGE;

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container"></div>
        <div className="home-text-section">
          <h1 className="primary-heading">KnightHacks</h1>
          <p className="primary-text">Welcome to the Hackathon!</p>
        </div>
        <div className="home-image-section">
          <img
            className="home-img"
            // src = {logo}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTvdxJ49OhGebwGyFeJ6KdU1xI3texup4sg&s"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
