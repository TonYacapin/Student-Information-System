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

import "./ViewStudents.css";
import Sidebar from "./Sidebar";

function Viewstudent() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:1337/viewStudents")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  function validateInputs() {
    let valid = true;
    const newErrors = {};

    if (!/^\d+$/.test(selectedStudent.year) || selectedStudent.year < 1 || selectedStudent.year > 5) {
      newErrors.year = "Year must be a number between 1 and 5";
      valid = false;
    }

    if (!/^\d{8}$/.test(selectedStudent.IdNum)) {
      newErrors.IdNum = "ID must be exactly 8 digits";
      valid = false;
    }

    if (!/^[a-zA-Z ]+$/.test(selectedStudent.FN)) {
      newErrors.FN = "First Name should not contain numbers or special characters";
      valid = false;
    }

    if (!/^[a-zA-Z ]+$/.test(selectedStudent.LN)) {
      newErrors.LN = "Last Name should not contain numbers or special characters";
      valid = false;
    }

    if (selectedStudent.MN.trim() !== "" && !/^[a-zA-Z ]+$/.test(selectedStudent.MN)) {
      newErrors.MN = "Middle Name should not contain numbers or special characters";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }

  function handleEditStudent(student) {
    setSelectedStudent(student);
    setOpenModal(true);
  };

  function handleCloseModal() {
    setOpenModal(false);
    setErrors({});
  };

  function handleUpdateStudent() {
    if (!validateInputs()) {
      return;
    }

    axios
      .put(`http://localhost:1337/updatestudent/${selectedStudent.IdNum}`, selectedStudent)
      .then((response) => {
        console.log("Student updated successfully:", response.data);
        // Assuming you want to refresh data after updating
        axios
          .get("http://localhost:1337/viewStudents")
          .then((response) => {
            setStudents(response.data);
          })
          .catch((error) => {
            console.error("Error fetching updated student data:", error);
          });
        setOpenModal(false); // Close modal after update
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  }

  return (
    <>
      <div className="baby">
        <div className="babies">
          <h1>View Students</h1>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Middle Name</TableCell>
                  <TableCell align="right">Course</TableCell>
                  <TableCell align="right">Year</TableCell>
                  <TableCell align="right">Actions</TableCell>
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
                      <Button variant="contained" onClick={() => handleEditStudent(student)}>EDIT</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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
                  error={!!errors.IdNum}
                  helperText={errors.IdNum}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, IdNum: e.target.value })}
                />
                <TextField
                  label="First Name"
                  value={selectedStudent.FN}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.FN}
                  helperText={errors.FN}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, FN: e.target.value })}
                />
                <TextField
                  label="Last Name"
                  value={selectedStudent.LN}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.LN}
                  helperText={errors.LN}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, LN: e.target.value })}
                />
                <TextField
                  label="Middle Name"
                  value={selectedStudent.MN}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.MN}
                  helperText={errors.MN}
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
                  error={!!errors.year}
                  helperText={errors.year}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, year: e.target.value })}
                />
              </>
            )}
          </DialogContent>
          <DialogActions className="modal-actions">
            <Button onClick={handleUpdateStudent} className="modal-button" color="primary">Update</Button>
            <Button onClick={handleCloseModal} className="modal-button">Close</Button>
          </DialogActions>
        </div>
      </Modal>
    </>
  );
}

export default Viewstudent;
