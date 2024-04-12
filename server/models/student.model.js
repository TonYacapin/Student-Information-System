const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const studentSchema = new Schema({
  IdNum: {
    type: String,
    required: true,
    unique: true,
  },
  FN: {
    type: String,
    required: true,
  },
  LN: {
    type: String,
    required: true,
  },
  MN: {
    type: String,
    default: '', // Default to an empty string if not provided
  },
  course: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
