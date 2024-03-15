import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Addstudent.css";

function AddStudent() {
  const [IdNum, setIdNum] = useState("");
  const [FN, setFN] = useState("");
  const [LN, setLN] = useState("");
  const [MN, setMN] = useState("");
  const [course, setcourse] = useState("");
  const [year, setyear] = useState("");
  const [errors, setErrors] = useState({});

  function validateInputs() {
    let valid = true;
    const newErrors = {};
  
    if (!/^\d{8}$/.test(IdNum)) {
      newErrors.IdNum = "ID must be exactly 8 digits";
      valid = false;
    }
  
    if (!/^[a-zA-Z ]+$/.test(FN)) {
      newErrors.FN = "First Name should not contain numbers or special characters";
      valid = false;
    }
  
    if (!/^[a-zA-Z ]+$/.test(LN)) {
      newErrors.LN = "Last Name should not contain numbers or special characters";
      valid = false;
    }
  
    if (MN.trim() !== "" && !/^[a-zA-Z ]+$/.test(MN)) {
      newErrors.MN = "Middle Name should not contain numbers or special characters";
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
  
    setErrors(newErrors);
    return valid;
  }
  
  async function handleAddStudent() {
    if (!validateInputs()) {
      return;
    }
  
    const studentData = {
      IdNum,
      FN,
      LN,
      MN,
      course,
      year,
    };
  
    try {
      // Check if ID number is duplicate
      const checkDuplicateResponse = await fetch(`http://localhost:1337/checkDuplicate/${IdNum}`);
      const isDuplicate = await checkDuplicateResponse.json();
  
      if (isDuplicate) {
        alert("ID Number already exists. Please use a different ID Number.");
        return;
      }
  
      // Proceed to add student if not a duplicate
      const addStudentResponse = await fetch("http://localhost:1337/addStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
  
      const result = await addStudentResponse.json();
  
      if (result.success) {
        setIdNum("");
        setFN("");
        setLN("");
        setMN("");
        setcourse("");
        setyear("");
        alert(result.message);
      } else {
        alert("Failed to add student. Please try again.");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Id number already exist. Please try again.");
    }
  }
  

  return (
    <div className="AddStudent">
      <div>
        <h2>ADD STUDENT</h2>
        <form>
          <div>
            <TextField
              label="ID Number"
              variant="outlined"
              margin="normal"
              fullWidth={false}
              style={{ width: "200px" }}
              value={IdNum}
              onChange={(e) => setIdNum(e.target.value)}
              error={!!errors.IdNum}
              helperText={errors.IdNum}
            />
          </div>
          {/* <div className="Description" >ID must be exactly 8 digits</div> */}
          <div>
            <TextField
              label="First Name"
              variant="outlined"
              margin="normal"
              fullWidth={false}
              style={{ width: "200px" }}
              value={FN}
              onChange={(e) => setFN(e.target.value)}
              error={!!errors.FN}
              helperText={errors.FN}
            />
          </div>
          {/* <div className="Description">First Name should not contain numbers or special characters</div> */}
          <div>
            <TextField
              label="Last Name"
              variant="outlined"
              margin="normal"
              fullWidth={false}
              style={{ width: "200px" }}
              value={LN}
              onChange={(e) => setLN(e.target.value)}
              error={!!errors.LN}
              helperText={errors.LN}
            />
          </div>
          {/* <div className="Description">Last Name should not contain numbers or special characters</div> */}
          <div>
            <TextField
              label="Middle Name"
              variant="outlined"
              margin="normal"
              fullWidth={false}
              style={{ width: "200px" }}
              value={MN}
              onChange={(e) => setMN(e.target.value)}
              error={!!errors.MN}
              helperText={errors.MN}
            />
          </div>
          {/* <div className="Description">Middle Name should not contain numbers or special characters</div> */}
          <div>
            <TextField
              label="Course"
              variant="outlined"
              margin="normal"
              fullWidth={false}
              style={{ width: "200px" }}
              value={course}
              onChange={(e) => setcourse(e.target.value)}
              error={!!errors.course}
              helperText={errors.course}
            />
          </div>
          {/* <div className="Description"> Course should not contain numbers or special characters</div> */}
          <div>
            <TextField
              label="Year"
              variant="outlined"
              margin="normal"
              type="number"
              fullWidth={false}
              
              helperText={errors.year}
              style={{ width: "200px" }}
              value={year}
              onChange={(e) => setyear(e.target.value)}
              error={!!errors.year}
            />
          </div>
          {/* <div className="Description">Year must be a number between 1 and 5</div> */}
       
          <Button variant="contained" color="primary" onClick={handleAddStudent}>
            ADD STUDENT
          </Button>

       
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
