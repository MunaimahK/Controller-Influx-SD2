import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Typography, Button, Container, Box } from "@mui/material";
const Payment = () => {
  const [paid, setPaid] = useState(false);
  // NOTE: insteand of checking dues in then, do a useeFFECT TO CHECK FOR PAID STTUS

  const createSession = async (req, res) => {
    let paidStatus = false;
    axios.defaults.withCredentials = true;
    try {
      const data = axios
        .get("/checkout-session", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(async (res) => {
          console.log(res.data.msg);
          console.log("2: ", res.data.msg);
          const red_url = res.data.msg;
          window.location.replace(red_url);
          /*
          try {
            // redirect to payment IF member's paid dues is false
            const check = await axios
              .get("/paid-dues-check")
              .then(async (res) => {
                console.log("RES AFTER CHECK:", res);
                paidStatus = res.data.paidDues;
                setPaid(res.data.paidDues);
                if (!res.data.paidDues) {
                  // window.location.replace(red_url);
                  console.log("PRESENT");
                }
              });
          } catch (err) {
            console.log(err);
          }*/ // this part replaced by a useeffect
        });
    } catch (err) {
      console.log(err);
    }
  };
  // Work on Handle Pay Dues. Need to run Influx Main Server First
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        {!paid ? (
          <Container
            maxWidth="sm"
            sx={{ alignItems: "center", marginTop: "20%" }}
          >
            <Box mt={4} textAlign="center">
              <Typography variant="h3" gutterBottom>
                Pay Dues
              </Typography>
              <Typography variant="h8" sx={{ alignText: "center" }}>
                Please pay your dues to continue accessing our services.
              </Typography>
              <Button
                sx={{ margin: "3vh" }}
                variant="contained"
                color="primary"
                onClick={createSession}
              >
                Pay Dues with Stripe
              </Button>
            </Box>
          </Container>
        ) : (
          <Container
            maxWidth="sm"
            sx={{ alignItems: "center", marginTop: "20%" }}
          >
            <Box mt={4} textAlign="center">
              <Typography variant="h3" gutterBottom>
                Hooray!
              </Typography>
              <Typography variant="h8" sx={{ alignText: "center" }}>
                You've alreay paid your dues.
              </Typography>
            </Box>
          </Container>
        )}
      </div>
    </div>
  );
};

export default Payment;
