import React from "react";
import {
  BiBookAlt,
  BiHome,
  BiSolidFile,
  BiUser,
  BiArrowFromRight,
  BiRightArrow,
  BiCalendar,
} from "react-icons/bi";
import "./AdminDashboard.css";
import axios from "axios";
const Sidebar = () => {
  const logout = async (req, res) => {
    try {
      const data = await axios.get("/logout");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="menu">
      <div className="menu-list-title">
        <a href="/admin" className="item">
          Admin Dashboard
        </a>
      </div>
      <div className="menu--list">
        <a href="/admin" className="item">
          <BiHome className="icon" />
          Home
        </a>
        <a href="/member/details" className="item">
          <BiUser className="icon" />
          Member Details
        </a>
        <a href="/events/admin" className="item">
          <BiCalendar className="icon" />
          Manage Events
        </a>
        <a href="/custom/question/form" className="item">
          <BiSolidFile className="icon" />
          Club Question Form
        </a>
      </div>
      <div className="menu-list-bottom">
        <a href="/login" className="item" onClick={logout}>
          <BiRightArrow className="icon" />
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
