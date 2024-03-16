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

function ViewUser() {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: ""
  });
  const [editingUser, setEditingUser] = useState(null); // State to store user being edited

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get("http://localhost:1337/api/users");
      setUsers(response.data)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function handleAdd() {
    try {
      if (editingUser) {
        // Update existing user
        const response = await axios.put(`http://localhost:1337/api/users/${editingUser._id}`, newUser);
        if (response.data) {
          alert("User updated successfully");
          fetchUsers(); // Refresh user list
          handleCloseModal(); // Close modal and clear form
        } else {
          console.log("Error updating user");
        }
      } else {
        // Add new user
        const response = await axios.post("http://localhost:1337/api/adduser", newUser);
        if (response.data.success) {
          alert(response.data.message);
          console.log(response.data.message); // User added successfully
          fetchUsers(); // Refresh user list
          handleCloseModal(); // Close modal and clear form
        } else {
          console.log(response.data.message); // Error message from server
        }
      }
    } catch (error) {
      console.error("Error adding/updating user:", error);
    }
  }
  

  function handleAddUser() {
    setOpenModal(true);
    setEditingUser(null); // Reset editing user
  }

  function handleEditUser(user) {
    setOpenModal(true);
    setEditingUser(user);
    setNewUser(user); // Set form fields to user data being edited
  }

  function handleCloseModal() {
    setOpenModal(false);
    setNewUser({
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      password: ""
    }); // Clear form fields
  }

  function handleInputChange(e, field) {
    const value = e.target.value;
    setNewUser({ ...newUser, [field]: value });
  }

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
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell align="right">{user.firstName}</TableCell>
                  <TableCell align="right">{user.lastName}</TableCell>
                  <TableCell align="right">{user.middleName}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
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
          <DialogTitle className="modal-title">{editingUser ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent className="modal-content">
            <>
              <TextField value={newUser.firstName} onChange={(e) => handleInputChange(e, "firstName")} label="First Name" id="firstName" variant="outlined" />
              <TextField value={newUser.lastName} onChange={(e) => handleInputChange(e, "lastName")} label="Last Name" id="lastName" variant="outlined" />
              <TextField value={newUser.middleName} onChange={(e) => handleInputChange(e, "middleName")} label="Middle Name" id="middleName" variant="outlined" />
              <TextField value={newUser.email} onChange={(e) => handleInputChange(e, "email")} label="Email" id="email" variant="outlined" />
              <TextField value={newUser.password} onChange={(e) => handleInputChange(e, "password")} label="Password" id="password" variant="outlined" />
            </>
          </DialogContent>
          <DialogActions className="modal-actions">
            <Button variant="contained" onClick={handleAdd}>{editingUser ? "Update User" : "Add User"}</Button>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        </div>
      </Modal>
    </div>
  );
}

export default ViewUser;
