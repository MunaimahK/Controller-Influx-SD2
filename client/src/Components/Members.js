import React from "react";
import "./Events.css";
import Navbar from "./Navbar";
import toast from "react-hot-toast";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Members.css";
import AdminNavbar from "./AdminNavbar";

const Members = () => {
  // fetch users from DB via backend API endpoint /member/details
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const event = useEffect(() => {
    axios
      .get("http://localhost:8000/member/details")
      .then((users) => setUsers(users.data))
      .catch((err) => console.log(err));
  }, []);

  const searchMember = (e) => {
    e.preventDefault();
    console.log("test search");
    const newSearchByName = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    if (newSearchByName) {
      console.log(newSearchByName);
      setUsers(newSearchByName);
    }

    const newSearchByUID = users.filter((user) =>
      user.UID.toLowerCase().includes(search.toLowerCase())
    );
    if (newSearchByUID) {
      console.log(newSearchByUID);
      //  setUsers(newSearchByUID);
      // setUsers(users);
    }
  };

  const resetSearch = (e) => {
    e.preventDefault();
    window.location.replace("http://localhost:3002/member/details");
  };
  return (
    // return retrieved data and display as a table
    <div id="main-bg">
      <AdminNavbar />
      <div>
        {
          <div className="users-table">
            <p>
              Your Total Contacts: <strong>{users.length}</strong>
            </p>
            <form onSubmit={searchMember}>
              <input
                className="search-bar"
                type="text"
                placeholder="Search Contact"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="btn-wrapper-table">
                <button type="submit" value="Search" className="button-6">
                  Search
                </button>
                <button
                  type="submit"
                  value="Reset"
                  className="button-6"
                  onClick={resetSearch}
                >
                  Reset
                </button>
              </div>
            </form>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Major</th>
                  <th>Graduating</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.major}</td>
                    <td>{user.gradDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
};

export default Members;
