import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import Sidebar from "./pages/Sidebar";
import ViewStudents from "./pages/ViewStudents";
import ViewUser from "./pages/ViewUser";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        {/* Set /login as the initial route */}
        <Route path="/" element={<Login />} initial />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/viewstudents" element={<ViewStudents />} />
        <Route path="/viewuser" element={<ViewUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
