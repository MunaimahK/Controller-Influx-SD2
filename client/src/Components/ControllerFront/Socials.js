import React from "react";
import MD from "./MD";
import Navbar from "./Navbar";

const Socials = () => {
  return (
    <div>
      {" "}
      <Navbar />
      <div className="main-pg">
        <div className="text-container">
          <MD filename="Socials.md" />
        </div>
      </div>
    </div>
  );
};

export default Socials;
