import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Profile from "./Profile";
import "./AdminDashboard.css";
import ContentHeader from "./ContentHeader";
// under dashbaord div
//       <ContentHeader />
const Dashboard = () => {
  return (
    <div>
      <div className="dashboard">
        <Sidebar />

        <div className="dashboard--content">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
