import React from "react";
import "./Dashboard.css";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";


function Dashboard() {
  return (
    <>
    <Sidebar/>
    <div className="Welcome"> 
      <h2>Welcome to Saint Mary's University</h2>
    </div>
</>
  );
}

export default Dashboard;
