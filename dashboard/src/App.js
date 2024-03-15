import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import Sidebar from "./pages/Sidebar";
import ViewStudents from "./pages/ViewStudents";
import ViewUser from "./pages/ViewUser";


function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Addstudent" element={<AddStudent />} />
        <Route path="/ViewStudents" element={<ViewStudents />} />
        <Route path="/ViewUser" element={<ViewUser/>}/>

        
     
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
