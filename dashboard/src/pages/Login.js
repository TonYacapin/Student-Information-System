import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Login.css";
import Modal from "@mui/material/Modal";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

function Login({ onLogin }) {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordLOGIN, setShowPasswordLOGIN] = useState(false);
  
  const handleLogin = async (e, setUser) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:1337/api/user/login`, {
        email: email,
        password: password,
      });
  
      const { token, user } = response.data; // Assuming the response contains both token and user data
  
      // Store token and user data in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      console.log("Login successful!");
      onLogin(token); // Call the onLogin prop function with the token
      setUser(user); // Set the user state in the parent component, assuming you have a setUser function in the parent component
  
      // Navigate to the appropriate dashboard based on user type
      if (user.isAdmin) {
        navigate("/dashboard"); // Navigate to the admin dashboard
      } else {
        navigate("/student-dashboard"); // Navigate to the student dashboard
      }
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data.message);
        setError("Invalid Email or Password");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response received. Please check your network connection.");
      } else {
        console.error("Error:", error.message);
        setError("An error occurred. Please try again later.");
      }
    }
  };
  
  
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

  function handleSignUp() {
    setOpenModal(true);
  }

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

  async function handleAdd() {
    try {
      if (!validateInputs()) {
        return;
      }

      // Add new user
      const response = await axios.post(
        "http://localhost:1337/api/user/register",
        newUser
      );
      if (response.data.success) {
        alert(response.data.message);
        console.log(response.data.message); // User added successfully
        handleCloseModal(); // Close modal and clear form
      } else {
        alert(response.data.message);
        console.log(response.data.message); // Error message from server
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
        alert("Email already exist");
        console.error("Error Signing Up", error);
      }
    }
  }

  function handleInputChange(e, field) {
    const value = e.target.value;
    setNewUser({ ...newUser, [field]: value });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilityLOGIN = () => {
    setShowPasswordLOGIN(!showPasswordLOGIN);
  };

  return (
    <div className="Login">   


      <div>
        <h1>Login</h1>
       
      
        <form onSubmit={handleLogin}>
          <div>
        {error && <p className="error-message">{error}</p>}
          <TextField
  label="Email"
  variant="outlined"
  margin="normal"
  fullWidth
  style={{ maxWidth: "300px" }} // Adjusted width
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!!errors.email}
  helperText={errors.email}
/>
<TextField
  label="Password"
  variant="outlined"
  margin="normal"
  fullWidth
  style={{ maxWidth: "300px" }} // Adjusted width
  type={showPasswordLOGIN ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error={!!errors.password}
  
  helperText={errors.password}
  InputProps={{
    endAdornment: (
      <Button onClick={togglePasswordVisibilityLOGIN}>
        {showPasswordLOGIN ? "Hide" : "Show"}
      </Button>
    ),
  }}
  
/>

          </div>
          <div className="btn-group">
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
           
<p>Don't have an account? <span onClick={handleSignUp} style={{cursor: 'pointer', color: 'blue'}}>Sign Up</span></p>
          </div>
        </form>
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="modal">
          <DialogTitle className="modal-title">{"SIGN UP"}</DialogTitle>
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
            <Button variant="contained" onClick={handleAdd}>{"SignUp"}</Button>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        </div>
      </Modal>
    </div>
  );
}

export default Login;
