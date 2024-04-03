import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "../AdminDashboard.css";
import Cards from "../Cards";
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

const Events = () => {
  const [currentE, setCurrentE] = useState([]);
  const [entry, setEntry] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });

  const event = useEffect(() => {
    axios
      .get("/display-events")
      .then((res) => {
        console.log("EVENTS RETURNED", res.data);
        setCurrentE(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addEvent = async (req, res) => {
    console.log("HERE");
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const { eventObj } = entry;
    console.log("E", entry);
    try {
      const ep = await axios
        .get("/update-events", {
          params: {
            entry,
          },
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const removeE = async (identifier, req, res) => {
    console.log("REMOVED");
    //  const qName = name;
    const eID = identifier;
    console.log(eID);
    try {
      const ep = await axios
        .get("/remove-event", {
          params: { eID },
        })
        .then((res) => {
          console.log("IN DELETE", res.data);

          setCurrentE(res.data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="table--content">
        {" "}
        <div className="header-text">
          <Header
            title="Event Management "
            subtitle="Provide Details to Register an event. Changed your mind? No worries, simply remove the event from the schedule. All club members will see these events."
          />
        </div>
        <div className="container-content">
          <div className="left">
            {" "}
            <form onSubmit={addEvent}>
              {" "}
              <FormControl
                style={{ marginLeft: "3vh" }}
                defaultValue=""
                required
              >
                {" "}
                <div>
                  <FormLabel style={{ marginLeft: "2vh", marginTop: "2vh" }}>
                    Event Title
                  </FormLabel>
                  <br></br>
                  <input
                    id="i"
                    value={entry.title || ""}
                    onChange={(e) =>
                      setEntry({ ...entry, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  {" "}
                  <FormLabel style={{ marginLeft: "2vh", marginTop: "2vh" }}>
                    Event Description
                  </FormLabel>
                  <br></br>
                  <input
                    id="i"
                    value={entry.description || ""}
                    onChange={(e) =>
                      setEntry({ ...entry, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <FormLabel style={{ marginLeft: "2vh", marginTop: "2vh" }}>
                    Event Location
                  </FormLabel>
                  <br></br>
                  <input
                    id="i"
                    value={entry.location || ""}
                    onChange={(e) =>
                      setEntry({ ...entry, location: e.target.value })
                    }
                  />
                </div>
                <div>
                  {" "}
                  <FormLabel style={{ marginLeft: "2vh", marginTop: "2vh" }}>
                    Event Location
                  </FormLabel>
                  <br></br>
                  <input
                    id="i"
                    value={entry.date || ""}
                    onChange={(e) =>
                      setEntry({ ...entry, date: e.target.value })
                    }
                  />
                </div>
                <br></br>
                <br></br>
                <button className="add-q-button" type="submit">
                  Submit
                </button>
              </FormControl>
            </form>
          </div>

          <div className="right" id="list">
            <div className="custom-q-text-render">
              <Typography
                sx={{
                  fontSize: 16,
                  color: "white",
                  alignItems: "center",
                  marginLeft: "1vh",
                }}
                color="text.secondary"
                gutterBottom
              >
                The following Events will appear on the "Events" Page on the
                Club Member Portal
              </Typography>
            </div>
            {currentE.map((output) => (
              <Box>
                <Card sx={{ margin: "1vh" }}>
                  <CardContent>
                    <div className="card-content-container">
                      <div className="btn-container">
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "gray",
                            color: "white",
                            borderRadius: "15px",
                            width: "12px",
                            fontSize: "10px",
                            minWidth: "10px",
                            width: "23px",
                            padding: "3px",
                          }}
                          onClick={() => removeE(output._id)}
                        >
                          X
                        </Button>
                      </div>
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
    </div>
  );
};

export default Events;
