import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  TextField
} from "@mui/material";
import Sidebar from "./Sidebar";

function ViewUser() {
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: "",
    isAdmin: ""
  });
  const [editingUser, setEditingUser] = useState(null); // State to store user being edited
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);


  function validateInputs() {
    let valid = true;
    const newErrors = {};

        // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regular expression for password validation (at least 8 characters long and contains at least one digit, one lowercase letter, one uppercase letter, and one special character)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/~`]).{8,}$/;

    // Check email
    if (!emailRegex.test(newUser.email)) {
        newErrors.email = "Invalid email address";
        valid = false;
    }

    // Check password
    if (!passwordRegex.test(newUser.password)) {
        newErrors.password = "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character";
        valid = false;
    }



    if (!/^[a-zA-Z ]+$/.test(newUser.firstName)) {
      newErrors.firstName = "First Name should not contain numbers or special characters";
      valid = false;
    }

    if (!/^[a-zA-Z ]+$/.test(newUser.lastName)) {
      newErrors.lastName = "Last Name should not contain numbers or special characters";
      valid = false;
    }

    if (newUser.middleName.trim() !== "" && !/^[a-zA-Z ]+$/.test(newUser.middleName)) {
      newErrors.middleName = "Middle Name should not contain numbers or special characters";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }

 
  async function fetchUsers() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:1337/api/user/getalluser", {
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
        // Update existing user
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await axios.put(
          `http://localhost:1337/api/user/${editingUser._id}`,
          newUser,
          {
            headers: {
              Authorization: `Bearer ${token}` // Set Authorization header with bearer token
            }
          }
        );
        if (response.data) {
          alert("User updated successfully");
          fetchUsers(); // Refresh user list
          handleCloseModal(); // Close modal and clear form
        } else {
          console.log("Error updating user");
        }
      } else {
        // Add new user
        const response = await axios.post(
          "http://localhost:1337/api/user/register",
          newUser
        );
        if (response.data.success) {
          alert(response.data.message);
          console.log(response.data.message); // User added successfully
          fetchUsers(); // Refresh user list
          handleCloseModal(); // Close modal and clear form
        } else {
          alert(response.data.message);
          console.log(response.data.message); // Error message from server
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Server returned an error message
        alert(error.response.data.message);
        console.error("Server error:", error.response.data.message);
      } else {
        // Generic error message
        alert("An error occurred while adding/updating user.");
        console.error("Error adding/updating user:", error);
      }
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
    setShowPassword(false); // Reset show password option
    setErrors({}); // Clear errors
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
    <Sidebar/>
  
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
              <TextField value={newUser.firstName} onChange={(e) => handleInputChange(e, "firstName")} label="First Name" id="firstName" variant="outlined" fullWidth margin="normal" required="true"     
               error={!!errors.firstName  }
               helperText={errors.firstName}
              
              />
              <TextField value={newUser.lastName} onChange={(e) => handleInputChange(e, "lastName")} label="Last Name" id="lastName" variant="outlined" fullWidth margin="normal" required="true"   
                error={!!errors.lastName  }
                helperText={errors.lastName}

              />
              <TextField value={newUser.middleName} onChange={(e) => handleInputChange(e, "middleName")} label="Middle Name" id="middleName" variant="outlined" fullWidth margin="normal"    
                error={!!errors.middleName  }
                helperText={errors.middleName}
              
              />
              <TextField value={newUser.email} onChange={(e) => handleInputChange(e, "email")} label="Email" id="email" type="email" variant="outlined" fullWidth margin="normal" required="true"  
                error={!!errors.email  }
                helperText={errors.email}
              
              />
              <TextField
                error={!!errors.password  }
                helperText={errors.password}
                value={newUser.password}
                onChange={(e) => handleInputChange(e, "password")}
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                required="true"
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

export default ViewUser;
