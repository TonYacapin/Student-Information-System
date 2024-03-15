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
        <Link to="/">
          <HomeIcon />
          HOME
        </Link>
        <Link to="AddStudent">
          <StudentAddIcon />
          ADD STUDENT
        </Link>
        <Link to="ViewStudents">
          <VisibilityIcon />
          VIEW STUDENTS
        </Link>
        <Link to="ViewUser">
          <VisibilityIcon />
          VIEW USERS
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;
