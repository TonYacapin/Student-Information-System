import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import StudentAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from '@mui/icons-material/Visibility';

function Sidebar() {
  return (
    <div className="sidebar bg-gray-800 text-white h-full">
      <div className="contents flex flex-col justify-between h-full py-8">
        <div className="links flex flex-col space-y-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <HomeIcon />
            <span>HOME</span>
          </Link>
          <Link to="/addstudent" className="flex items-center space-x-2">
            <StudentAddIcon />
            <span>ADD STUDENT</span>
          </Link>
          <Link to="/viewstudents" className="flex items-center space-x-2">
            <VisibilityIcon />
            <span>VIEW STUDENTS</span>
          </Link>
          <Link to="/viewuser" className="flex items-center space-x-2">
            <VisibilityIcon />
            <span>VIEW USERS</span>
          </Link>
          <Link to="/managestudent" className="flex items-center space-x-2">
            <VisibilityIcon />
            <span>MANAGE STUDENT</span>
          </Link>
        </div>
        <div className="logout-button mt-8">
          <button className="w-full bg-red-500 text-white py-2 px-4 rounded-md">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
