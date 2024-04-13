const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../Controllers/studentControllers');

// Route to create a new student
router.post('/students', createStudent);

// Route to get all students
router.get('/students', getAllStudents);

// Route to get a single student by IdNum
router.get('/students/:id', getStudentById);

// Route to update a student by IdNum
router.put('/students/:id', updateStudent);

// Route to delete a student by IdNum
router.delete('/students/:id', deleteStudent);

module.exports = router;
