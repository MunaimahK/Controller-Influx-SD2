import React, { useEffect, useState } from "react";
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
        })
        .then(async () => {
          const data = (await axios.get("/update-paid-dues")).then((res) => {
            console.log(res);
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Function to check paid status when component mounts
    const checkPaidStatus = async () => {
      try {
        const response = await axios.get("/check-dues");
        setPaid(response.data.paidDues);
        console.log(response.data.paidDues);
      } catch (error) {
        console.error("Error checking paid status:", error);
      }
    };

    // Call the function to check paid status
    checkPaidStatus();
  }, []);
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
