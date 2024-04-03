import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ListAltIcon from "@material-ui/icons/ListAlt";

export const AdminNavData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/admin",
  },
  {
    title: "Custom Questions",
    icon: <ListAltIcon />,
    link: "/create/events",
  },
  {
    title: "Check Dues",
    icon: <AttachMoneyIcon />,
    link: "/member/details",
  },
  {
    title: "Create Event",
    icon: <EventNoteIcon />,
    link: "/create/events",
  },
];
