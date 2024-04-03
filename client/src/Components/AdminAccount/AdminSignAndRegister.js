import React, { useEffect, useState } from "react";
import "./AdminSignAndRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminSignAndRegister = () => {
  function goBack() {
    window.history.back();
  }
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const loginUser = async (e) => {
    axios.defaults.withCredentials = true;
    e.preventDefault();
    // navigate("/admin", { replace: true });

    const { username, password } = data;
    try {
      console.log(username, password);
      const { data } = await axios
        .get("/login", {
          params: {
            username,
            password,
          },
        })
        .then((res) => {
          if (res.data.error) {
            // toast.error(data.error);
            console.log("User does not exist");
          } else {
            console.log("No error");
            // toast.success("Welcome!");
            navigate("/admin", { replace: true });
          }
        });
    } catch (error) {
      //console.log(error);
    }
  };

  const resetPWD = () => {
    console.log("RESET PWD");
  };

  return (
    <div className="body-sign-in">
      <div className="back-arrow">
        <a href="/">
          <i className="arrow left"></i>
        </a>
      </div>

      <div className="container-sign-in" id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <span>or use your email for registeration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={loginUser}>Sign In</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>

            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <a href="/forget/password">Forgot Your Password?</a>
            <button onClick={loginUser}>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hey, Welcome Back!</h1>
              <p>Please login to access the Influx Admin Page</p>
              <button className="hidden register">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignAndRegister;
