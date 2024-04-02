import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

import HomeIcon from "@mui/icons-material/Home";

import StudentAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from '@mui/icons-material/Visibility';
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="contents">
        <Link to="/dashboard">
          <HomeIcon />
          HOME
        </Link>
        <Link to="/addstudent">
          <StudentAddIcon />
          ADD STUDENT
        </Link>
        <Link to="/viewstudents">
          <VisibilityIcon />
          VIEW STUDENTS
        </Link>
        <Link to="/viewuser">
          <VisibilityIcon />
          VIEW USERS
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;
