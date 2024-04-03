import React from "react";
import { BiNotification, BiSearch } from "react-icons/bi";

const ContentHeader = () => {
  return (
    <div className="content-header">
      <h3 className="header-title">Admin Dashboard</h3>
      <div className="search-box">
        <input placeholder="Search" type="text" />
        <BiSearch className="icon" />
      </div>
      <div className="notify">
        <BiNotification className="icon" />
      </div>
    </div>
  );
};

export default ContentHeader;
