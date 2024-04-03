import React, { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaHome, FaUserCog, FaCalendarAlt } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "./HomePage.css";
import { useNavigate } from "react-router";
const Navbar = () => {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const apiUrl = process.env.INFLUX_MAIN_URL;
  // NOTE: Figure out how to remove hardcoded URL
  const navOptions = [
    {
      text: "Home",
      icon: <FaHome />,
      link: "/",
    },
    {
      text: "About",
      icon: <LuNewspaper />,
      link: "/about",
    },
    {
      text: "Events",
      icon: <FaCalendarAlt />,
      link: "/socials",
    },
    {
      text: "Pay Dues",
      icon: <FaMoneyCheckDollar />,
      link: "/pay/Dues/Stripe",
    },
    {
      text: "Admin",
      icon: <FaUserCog />,
      link: "/login",
    },
  ];
  return (
    <nav className="navbar-home">
      <div className="nav-title-container">
        <a href="/">KnightHacks</a>
      </div>
      <div className="nav-links-container">
        <a
          href="http://localhost:3000/influx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Influx
        </a>
        <a href="/about">About</a>
        <a href="/events">Events</a>
        <a href="/socials">Socials</a>
        <a href="/pay/Dues/Stripe">Pay Dues</a>
        <a href="/login">Admin</a>
      </div>
      <div className="nav-menu-container">
        <HiOutlineBars3 onClick={() => setOpenNav(true)} />
      </div>
      <Drawer open={openNav} onClose={() => setOpenNav(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenNav(false)}
          onKeyDown={() => setOpenNav(false)}
        >
          <List>
            {navOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon href={item.link}>{item.icon}</ListItemIcon>
                  <a className="list-item-a" href={item.link}>
                    {item.text}
                  </a>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
