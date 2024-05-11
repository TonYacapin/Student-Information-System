import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import ViewStudents from './pages/ViewStudents';
import ViewUser from './pages/ViewUser';
import Login from './pages/Login';
import ManageUser from './pages/ManageStudent';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken);
  const [loading, setLoading] = useState(true);

  // Function to handle login
  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  // Redirect to Dashboard if token exists
  if (token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<ProtectedRoute token={token} component={Dashboard} />} />
          <Route path="/addstudent" element={<ProtectedRoute token={token} component={AddStudent} />} />
          <Route path="/viewstudents" element={<ProtectedRoute token={token} component={ViewStudents} />} />
          <Route path="/viewuser" element={<ProtectedRoute token={token} component={ViewUser} />} />
          <Route path="/managestudent" element={<ProtectedRoute token={token} component={ManageUser} />} />
          <Route path="/student-dashboard" element={<ProtectedRoute token={token} component={StudentDashboard} /> } />
        </Routes>
      </BrowserRouter>
    );
  }

  // Render Login if token doesn't exist
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoute({ token, component: Component, ...rest }) {
  return token ? <Component {...rest} /> : <Navigate to="/" />;
}

export default App;
