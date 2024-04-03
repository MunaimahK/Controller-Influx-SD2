import React from "react";
import ContentHeader from "./ContentHeader";
import Cards from "./Cards";
import { useEffect, useState } from "react";
import axios from "axios";
import GraphPie from "./GraphPie.js";
import Header from "./Header.js";

const Content = () => {
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalMembersPayingDues, setTotalMembersPayingDues] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  useEffect(() => {
    axios
      .get("/total/members")
      .then((res) => {
        console.log("total members:", res.data.data);
        setTotalMembers(res.data.data);
      })
      .catch((error) => console.error("Error fetching count:", error));
  }, []);
  useEffect(() => {
    axios
      .get("/total/members/paid/dues")
      .then((res) => {
        console.log("total paying dues:", res.data.data);
        setTotalMembersPayingDues(res.data.data);
      })
      .catch((error) => console.error("Error fetching count:", error));
  }, []);

  useEffect(() => {
    axios
      .get("/total/admins")
      .then((res) => {
        console.log("ADMINS:", res.data.data);
        setTotalAdmins(res.data.data);
      })
      .catch((error) => console.error("Error fetching count:", error));
  }, []);

  return (
    <div>
      {" "}
      <div className="header-text">
        <Header
          title="Welcome!"
          subtitle="Check Club Vitals. View Stats. Check in on Members."
        />
      </div>
      <div className="container-content">
        <div className="left">
          {" "}
          <Cards title="Members" value={totalMembers} />
          <Cards title="Members Paid" value={totalMembersPayingDues} />
          <Cards title="Admins" value={totalAdmins} />
        </div>

        <div className="right">
          <GraphPie
            target={totalMembersPayingDues}
            targetLabel={"Already Paid Dues"}
            targetColor={"#c5e0dd"}
            total={totalMembers}
            totalLabel={"Pending Payment"}
            totalColor={"#324b5c"}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
