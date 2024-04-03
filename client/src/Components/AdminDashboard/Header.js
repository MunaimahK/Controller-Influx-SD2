import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <Typography
        variant="h3"
        color={"#45484a"}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color="#8b9094">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
