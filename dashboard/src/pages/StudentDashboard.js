import React from 'react';

import "./StudentDashboard.css"
import Sidebar from './Sidebar';

function StudentDashboard() {
  // Retrieve student data from localStorage
  const userId = localStorage.getItem('userId');
  const idnumber = localStorage.getItem('idnumber');
  const firstname = localStorage.getItem('firstname');
  const lastname = localStorage.getItem('lastname');
  const middlename = localStorage.getItem('middlename');
  const course = localStorage.getItem('course');
  const year = localStorage.getItem('year');

  return (
    <>
    <Sidebar/>
 
    <div className='StudentDashboard'>
      <h1>Student Dashboard</h1>
      <div>
   
        <p>ID Number: {idnumber}</p>
        <p>First Name: {firstname}</p>
        <p>Last Name: {lastname}</p>
        <p>Middle Name: {middlename}</p>
        <p>Course: {course}</p>
        <p>Year: {year}</p>
      </div>
    </div>
    </>
  );
}

export default StudentDashboard;
