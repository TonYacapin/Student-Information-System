import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import Sidebar from "./Sidebar";

function ManageStudent() {
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    idnumber: "",
    firstname: "",
    lastname: "",
    middlename: "",
    course: "",
    year: "",
    password: ""
  });
  const [editingUser, setEditingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  function validateInputs() {
    let valid = true;
    const newErrors = {};
    const { idnumber, firstname, lastname, middlename, course, year, password } = newUser;

    if (!/^\d{8}$/.test(idnumber)) {
      newErrors.idnumber = "ID must be exactly 8 digits";
      valid = false;
    }

    if (!/^[a-zA-Z ]+$/.test(firstname)) {
      newErrors.firstname = "First Name should not contain numbers or special characters";
      valid = false;
    }

    if (!/^[a-zA-Z ]+$/.test(lastname)) {
      newErrors.lastname = "Last Name should not contain numbers or special characters";
      valid = false;
    }

    if (middlename.trim() !== "" && !/^[a-zA-Z ]+$/.test(middlename)) {
      newErrors.middlename = "Middle Name should not contain numbers or special characters";
      valid = false;
    }

    if (!/^[a-zA-Z ]+$/.test(course)) {
      newErrors.course = "Course should not contain numbers or special characters";
      valid = false;
    }

    if (isNaN(year) || year < 1 || year > 5) {
      newErrors.year = "Year must be a number between 1 and 5";
      valid = false;
    }

    // Password validation
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  async function fetchUsers() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:1337/api/students/students", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function handleAdd() {
    try {
      if (!validateInputs()) {
        return;
      }
      if (editingUser) {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `http://localhost:1337/api/students/students/${editingUser._id}`,
          newUser,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.data) {
          alert("User updated successfully");
          fetchUsers();
          handleCloseModal();
        } else {
          console.log("Error updating user");
        }
      } else {
        const response = await axios.post(
          "http://localhost:1337/api/students/students/",
          newUser
        );
        if (response.data.success) {
          alert(response.data.message);
          console.log(response.data.message);
          fetchUsers();
          handleCloseModal();
        } else {
          alert(response.data.message);
          console.log(response.data.message);
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
        console.error("Server error:", error.response.data.message);
      } else {
        alert("ID number already Exist");
        console.error("ID number already Exist", error);
      }
    }
  }

  function handleAddUser() {
    setOpenModal(true);
    setEditingUser(null);
  }

  function handleEditUser(user) {
    setOpenModal(true);
    setEditingUser(user);
    setNewUser(user);
  }

  function handleCloseModal() {
    setOpenModal(false);
    setNewUser({
      idnumber: "",
      firstname: "",
      lastname: "",
      middlename: "",
      course: "",
      year: "",
      password: ""
    });
    setShowPassword(false);
    setErrors({});
  }

  function handleInputChange(e, field) {
    const value = e.target.value;
    setNewUser({ ...newUser, [field]: value });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Sidebar />

      <div className="baby">
        <div className="babies">
          <h1>MANAGE STUDENTS</h1>
          <TableContainer component={Paper}>
            <Button variant="contained" onClick={handleAddUser}>ADD STUDENT</Button>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Id Number</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Middle Name</TableCell>
                  <TableCell align="right">Course</TableCell>
                  <TableCell align="right">Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell align="right">{user.idnumber}</TableCell>
                    <TableCell align="right">{user.firstname}</TableCell>
                    <TableCell align="right">{user.lastname}</TableCell>
                    <TableCell align="right">{user.middlename}</TableCell>
                    <TableCell align="right">{user.course}</TableCell>
                    <TableCell align="right">{user.year}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" onClick={() => handleEditUser(user)}>EDIT</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Modal open={openModal} onClose={handleCloseModal}>
          <div className="modal">
            <DialogTitle className="modal-title">{editingUser ? "Edit Student" : "Add Student"}</DialogTitle>
            <DialogContent className="modal-content">
              <>
                <TextField
                  value={newUser.idnumber}
                  onChange={(e) => handleInputChange(e, "idnumber")}
                  label="Id Number"
                  id="idnumber"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.idnumber}
                  helperText={errors.idnumber}
                />

                <TextField
                  value={newUser.firstname}
                  onChange={(e) => handleInputChange(e, "firstname")}
                  label="First Name"
                  id="firstName"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.firstname}
                  helperText={errors.firstname}
                />

                <TextField
                  value={newUser.lastname}
                  onChange={(e) => handleInputChange(e, "lastname")}
                  label="Last Name"
                  id="lastName"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.lastname}
                  helperText={errors.lastname}
                />

                <TextField
                  value={newUser.middlename}
                  onChange={(e) => handleInputChange(e, "middlename")}
                  label="Middle Name"
                  id="middleName"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.middlename}
                  helperText={errors.middleName}
                />

                <TextField
                  value={newUser.course}
                  onChange={(e) => handleInputChange(e, "course")}
                  label="Course"
                  id="course"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.course}
                  helperText={errors.course}
                />

                <TextField
                  value={newUser.year}
                  onChange={(e) => handleInputChange(e, "year")}
                  label="Year"
                  id="year"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  error={!!errors.year}
                  helperText={errors.year}
                />

                <TextField
                  value={newUser.password}
                  onChange={(e) => handleInputChange(e, "password")}
                  label="Password"
                  id="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type={showPassword ? "text" : "password"}
                  required
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <Button onClick={togglePasswordVisibility}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    ),
                  }}
                />
              </>
            </DialogContent>
            <DialogActions className="modal-actions">
              <Button variant="contained" onClick={handleAdd}>{editingUser ? "Update User" : "Add User"}</Button>
              <Button onClick={handleCloseModal}>Close</Button>
            </DialogActions>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default ManageStudent;
