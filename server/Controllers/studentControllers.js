const Student = require('../models/student.model');

// Controller to create a new student
const createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
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
  const idNum = req.params.idNum;
  try {
    const student = await Student.findOne({ IdNum: idNum });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a student by IdNum
const updateStudent = async (req, res) => {
  const idNum = req.params.idNum;
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { IdNum: idNum },
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to delete a student by IdNum
const deleteStudent = async (req, res) => {
  const idNum = req.params.idNum;
  try {
    const deletedStudent = await Student.findOneAndDelete({ IdNum: idNum });
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
