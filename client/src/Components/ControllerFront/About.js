import React from "react";
import MD from "./MD";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div>
      {" "}
      <Navbar />
      <div className="main-pg">
        <div className="text-container">
          <MD filename="About.md" />
        </div>
      </div>
    </div>
  );
};

export default About;
