import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Login.css";

function Login() {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:1337/api/user/login`, {
        email: email,
        password: password,
      });

      const { token } = response.data;

      localStorage.setItem('token', token);


      console.log('Login successful!');
      navigate('/dashboard'); // Redirect to Dashboard after successful login
    } catch (error) {
      if (error.response) {
        console.error('Login failed:', error.response.data.message);
        setError(error.response.data.message);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('No response received. Please check your network connection.');
      } else {
        console.error('Error:', error.message);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="Login">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              style={{ width: "200px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>
          <div>
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              style={{ width: "200px" }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
