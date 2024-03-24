import { useEffect } from "react";
import "./mainpage.css";
import Navbar from "./Navbar";
import axios from "axios";
import useRefreshToken from "./refreshToken";
const Mainpage = () => {
  //useRefreshToken();
  return (
    <div id="main-rso">
      <Navbar />
      <div className="container">
        <div className="intro">
          <div className="intro-text">
            Knight Hacks
            <div className="about">
              <p>
                Ready to kickstart your career in tech? Join us for Knighthacks!
                Students from around the world will come together to learn the
                latest technologies, develop innovative solutions, network with
                top companies, and more! This year, we are excited to announce
                two features to this year's hackathon; we are an MLH season
                starter hackathon and we have partnered with Hack@UCF to bring
                you the Horse Plinko Cyber Challenge, a blue team vs. red team
                competition as well as cybersecurity convention! Along with all
                our amazing workshops, you also have the chance work together to
                build exciting projects, meet recruiters and land job
                opportunities, win prizes, get swag, and have fun!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mainpage;
