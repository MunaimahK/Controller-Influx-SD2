import { Box, Typogrophy, rgbToHex, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Header from "../Header";
/*<Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column-cell": {
              color: "#32a852",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#343345 !important",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "none",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "none",
            },
            "& .MuiCheckbox-root": {
              color: "#030503 !important",
            },
            "& .MuiDataGrid-toolbarContainer": {
              backgroundColor: "#f0f0f0", // Background color of the toolbar container
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: "#030503  !important",
            },
          }}
        >
          <div className="content-content">
            {" "}
            <header>
              <h1>MemberDetails</h1>
            </header>
            <DataGrid
              components={{
                Toolbar: GridToolbar, // To enable toolbar
              }}
              rows={users}
              columns={columns}
            />
          </div>
        </Box> */
const MemberDetails = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const event = useEffect(() => {
    axios
      // .get("http://localhost:8000/member/details")
      .get("/member/details")
      .then((users) => {
        //setUsers(users.data);
        const usersWithIds = users.data.map((user, index) => ({
          id: index + 1, // You can adjust the logic for generating unique IDs as needed
          ...user,
        }));
        setUsers(usersWithIds);
      })
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
  const columns = [
    { field: "UID", headerName: "UID" },
    { field: "paidDues", headerName: "Dues Paid" },
    {
      field: "f_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "NID",
      headerName: "NID",
      type: "number",
      headerAlign: "left",
    },
    {
      field: "major",
      headerName: "Discipline",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="table--content">
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-toolbarContainer": {
              backgroundColor: "#f0f0f0", // Background color of the toolbar container
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: "#030503", // Color of toolbar buttons
            },
            "& .MuiFormControlLabel-root": {
              height: "0px",
            },
            "& .MuiCheckbox-root": {
              color: "green !important",
            },
          }}
        >
          <div className="content-content">
            {" "}
            <Header
              title="Member Details"
              subtitle="Details for enrolled club members"
            />
            <DataGrid
              slots={{
                toolbar: GridToolbar,
              }}
              rows={users}
              columns={columns}
            />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default MemberDetails;
