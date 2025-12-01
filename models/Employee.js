// models/Employee.js
// Employee schema for CRUD operations

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
    },
    // will hold image path later (profile picture)
    profilePicture: {
      type: String,
      default: null,   // e.g. "/uploads/123456.png"
    },
    
  },
  {
    timestamps: true, // createdAt / updatedAt fields
  }
);

module.exports = mongoose.model('Employee', employeeSchema);
