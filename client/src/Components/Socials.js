import React from "react";
import Navbar from "./Navbar";
import "./Socials.css";

const Socials = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="intro">
          <div className="intro-text">
            <h1>Socials Page</h1>
            <p>
              Welcome to the Knight Hacks social page! Here you can find
              information about our social events and connect with us on various
              social media platforms.
            </p>
            Email: knighthacks@gmail.com || Instagram: @knighthacks || Facebook:
            Knight Hacks UCF
          </div>
        </div>
      </div>
    </div>
  );
};

export default Socials;
