import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import ViewStudents from './pages/ViewStudents';
import ViewUser from './pages/ViewUser';
import Login from './pages/Login';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<ProtectedRoute token={token} component={Dashboard} />} />
        <Route path="/addstudent" element={<ProtectedRoute token={token} component={AddStudent} />} />
        <Route path="/viewstudents" element={<ProtectedRoute token={token} component={ViewStudents} />} />
        <Route path="/viewuser" element={<ProtectedRoute token={token} component={ViewUser} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoute({ token, component: Component, ...rest }) {
  return token ? <Component {...rest} /> : <Navigate to="/login" />;
}

export default App;
