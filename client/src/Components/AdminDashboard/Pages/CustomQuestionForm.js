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

const CustomQuestionForm = () => {
  const [currentQ, setCurrentQ] = useState([]);
  const [data, setData] = useState({
    q: "",
  });

  const event = useEffect(() => {
    axios
      .get("/display-custom-questions")
      .then((res) => {
        console.log("CQ RETURNED", res.data.customquestion);
        setCurrentQ(res.data.customquestion);
      })
      .catch((err) => console.log(err));
  }, []);

  const addToCQList = async (req, res) => {
    console.log("HERE");
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const { q } = data;
    if (q !== "") {
      try {
        const ep = await axios
          .get("/update-custom-questions", {
            params: { q },
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
    console.log("Q", q);
  };

  const removeQ = async (name, req, res) => {
    console.log("REMOVED");
    //  const qName = name;
    const qID = name;
    console.log(qID);
    try {
      const ep = await axios
        .get("/remove-question", {
          params: { qID },
        })
        .then((res) => {
          console.log("IN DELETE", res.data.customquestion);

          setCurrentQ(res.data.customquestion);
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
            title="Edit Question Form"
            subtitle="Don't want to ask a question anymore? That's fine. Simply remove. Or add more questions!"
          />
        </div>
        <div className="container-content">
          <div className="left">
            {" "}
            <form onSubmit={addToCQList}>
              {" "}
              <FormControl
                style={{ marginLeft: "3vh" }}
                defaultValue=""
                required
              >
                <FormLabel style={{ marginLeft: "2vh" }}>
                  Add a Question to the Form
                </FormLabel>
                <input
                  id="i"
                  placeholder="Enter the Question You'd like to add"
                  value={data.q || ""}
                  onChange={(e) => setData({ ...data, q: e.target.value })}
                />
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
                The following questions will appear on the Custom Question Form
                during Club Enrollment
              </Typography>
            </div>
            {currentQ.map((output) => (
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
                          onClick={() => removeQ(output._id)}
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
                          {output.question}
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

export default CustomQuestionForm;
