
import "./Dashboard.css";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

function ViewUser() {

    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [errors, setErrors] = useState({});

    function handleAddUser(student) {
      //  setSelectedStudent(student);
        setOpenModal(true);
      };
    
      function handleCloseModal() {
        setOpenModal(false);
        // setErrors({});
      };
  
  return (
    <div className="baby">
    <div className="babies">
      <h1>VIEW USERS</h1>

      <TableContainer component={Paper}>
      <Button variant="contained" onClick={handleAddUser}>ADD USER</Button>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Middle Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Password</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.IdNum}>
                <TableCell align="right">{student.IdNum}</TableCell>
                <TableCell align="right">{student.FN}</TableCell>
                <TableCell align="right">{student.LN}</TableCell>
                <TableCell align="right">{student.MN}</TableCell>
                <TableCell align="right">{student.course}</TableCell>
                <TableCell align="right">{student.year}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" >EDIT</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

    <Modal open={openModal} onClose={handleCloseModal}>
        <div className="modal">
          <DialogTitle className="modal-title">Student Details</DialogTitle>
          <DialogContent className="modal-content">
            {selectedStudent && (
              <>
                <TextField
                  label="ID"
                  value={selectedStudent.IdNum}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  disabled
                 
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, IdNum: e.target.value })}
                />
                <TextField
                  label="First Name"
                  value={selectedStudent.FN}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, FN: e.target.value })}
                />
                <TextField
                  label="Last Name"
                  value={selectedStudent.LN}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                 
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, LN: e.target.value })}
                />
                <TextField
                  label="Middle Name"
                  value={selectedStudent.MN}
                  variant="outlined"
                  fullWidth
                  margin="normal"
              
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, MN: e.target.value })}
                />
                <TextField
                  label="Course"
                  value={selectedStudent.course}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, course: e.target.value })}
                />
                <TextField
                  label="Year"
                  value={selectedStudent.year}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, year: e.target.value })}
                />
              </>
            )}
          </DialogContent>
          <DialogActions className="modal-actions">
            <Button className="modal-button" color="primary">Add</Button>
            <Button className="modal-button" onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        </div>
      </Modal>

  </div>

  
  
  );
}

export default ViewUser;
