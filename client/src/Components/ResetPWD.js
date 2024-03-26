import React from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { useState } from "react";

const ResetPWD = () => {
  const [data, setData] = useState({
    email: "",
  });
  const promptReset = async (req, res) => {
    const { email } = data;
    try {
      const data = axios
        .get("/password-reset-request", { email })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {}
  };
  return (
    <div>
      <AdminNavbar />

      <div>
        <label>Surname</label>
        <br></br>
        <input
          type="text"
          placeholder="Email Address"
          value={data.email || ""}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        ></input>
      </div>
      <button onClick={promptReset}>Reset Password</button>
    </div>
  );
};

export default ResetPWD;
