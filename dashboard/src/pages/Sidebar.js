import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StudentAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from '@mui/icons-material/Visibility';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
        </Box>
      </div>
    </div>
  );
}

export default Sidebar;
