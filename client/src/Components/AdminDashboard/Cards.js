import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Cards = ({ title, value }) => {
  return (
    <div className="card-admin-d">
      {" "}
      <Box
        sx={{
          borderRadius: 2,
          margin: 2,
          width: 250,
          backgroundColor: "#c5e0dd",
        }}
      >
        {" "}
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              Total
            </Typography>
            <Typography variant="h5" component="div">
              {title}
              &nbsp;
              {value}
            </Typography>
          </CardContent>
        </React.Fragment>
      </Box>
    </div>
  );
};

export default Cards;
