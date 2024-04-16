const Student = require('../models/student.model');
const asyncHandler = require("express-async-handler");
// Controller to create a new student
const createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    
    res.status(201).json({ success: true, message: 'Student successfully added', student: newStudent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a single student by IdNum
const getStudentById = async (req, res) => {
  const studentId = req.params.id;
  console.log(studentId);
  try {
    console.log('Student ID:', studentId); // Log the student ID for debugging

    const student = await Student.findById(studentId);

    if (!student) {
      console.log('Student not found'); // Log if student not found for debugging
      return res.status(404).json({ message: 'Student not founds', studentId }); // Include student ID in response
    }

    res.json({
      _id: student._id,
      idnumber: student.idnumber,
      firstname: student.firstname,
      lastname: student.lastname,
      middlename: student.middlename,
      course: student.course,
      year: student.year,
      studentId // Include student ID in response
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Controller to update a student by IdNum
// const updateStudent = async (req, res) => {
//   const idNum = req.params.idnumber;
//   try {
//     const updatedStudent = await Student.findOneAndUpdate(
//       { idnumber: idNum },
//       req.body,
//       { new: true }
//     );
//     if (!updatedStudent) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
//     res.json(updatedStudent);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const updateStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;

  // Find the student with the given ID
  const student = await Student.findById(studentId);

  if (student) {
    // If the student is found, update its properties
    student.idnumber = req.body.idnumber || student.idnumber;
    student.firstname = req.body.firstname || student.firstname;
    student.lastname = req.body.lastname || student.lastname;
    student.middlename = req.body.middlename || student.middlename;
    student.course = req.body.course || student.course;
    student.year = req.body.year || student.year;

    // Save the updated student
    const updatedStudent = await student.save();

    // Return the updated student details
    res.json({
      requestedStudentId: studentId,
      foundStudent: student,
      updatedStudent: {
        _id: updatedStudent._id,
        idnumber: updatedStudent.idnumber,
        firstname: updatedStudent.firstname,
        lastname: updatedStudent.lastname,
        middlename: updatedStudent.middlename,
        course: updatedStudent.course,
        year: updatedStudent.year,
      }
    });
  } else {
    // If the student is not found, return a 404 error
    res.status(404).json({
      message: 'Student not found',
      requestedStudentId: studentId,
    });
  }
});




// Controller to delete a student by IdNum
const deleteStudent = async (req, res) => {
  const idNum = req.params.idnumber;
  try {
    const deletedStudent = await Student.findOneAndDelete({ idnumber: idNum });
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
