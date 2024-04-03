import React from "react";
import Navbar from "./Navbar";
import bannerImg from "./banner-globe.png";
import "../AdminDashboard/AdminDashboard.css";
import Cards from "../AdminDashboard/Cards";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  FormLabel,
  Typography,
} from "@mui/material";
import Header from "../AdminDashboard/Header";

const EventPage = () => {
  const [currentE, setCurrentE] = useState([]);

  const event = useEffect(() => {
    axios
      .get("/display-events")
      .then((res) => {
        console.log("EVENTS RETURNED", res.data);
        setCurrentE(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="header-text-container">
          {" "}
          <Header
            title="Exciting Events!"
            subtitle="View all club events below"
          />
        </div>

        <div className="event-card-container">
          {" "}
          {currentE.map((output) => (
            <Box>
              <Card sx={{ margin: "1vh" }}>
                <CardContent>
                  <div className="card-content-container">
                    <div className="text-container-card">
                      {" "}
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <div>
                          <h2>{output.eventTitle}</h2>
                          <h4>{output.Description}</h4>
                          <h4>{output.Location}</h4>
                          <h4>{output.Date}</h4>
                        </div>
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
