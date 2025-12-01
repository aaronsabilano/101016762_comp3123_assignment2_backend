// routes/employeeRoutes.js
// Employee CRUD + search + profile picture upload

const express = require('express');
const Employee = require('../models/Employee');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Protect all routes below with JWT auth
router.use(authMiddleware);

/**
 * POST /api/employees
 * Create a new employee (supports profilePicture upload)
 */
router.post(
  '/',
  upload.single('profilePicture'), // expects field name "profilePicture"
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        department,
        position,
        salary,
      } = req.body;

      if (!firstName || !lastName || !email || !department || !position) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // If a file was uploaded, multer puts info on req.file
      let profilePicture = null;
      if (req.file) {
        // Store relative path, e.g. "uploads/1234-image.png"
        profilePicture = req.file.path;
      }

      const employee = await Employee.create({
        firstName,
        lastName,
        email,
        department,
        position,
        salary,
        profilePicture,
      });

      res.status(201).json(employee);
    } catch (error) {
      console.error('Create employee error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/**
 * GET /api/employees/search?department=IT&position=Developer
 * Search employees by department and/or position
 */
router.get('/search', async (req, res) => {
  try {
    const { department, position } = req.query;

    const filter = {};

    if (department) filter.department = department;
    if (position) filter.position = position;

    const employees = await Employee.find(filter).sort({ createdAt: -1 });

    res.json(employees);
  } catch (error) {
    console.error('Search employees error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/employees
 * Get all employees
 */
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/employees/:id
 * Get one employee by id
 */
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    console.error('Get employee error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUT /api/employees/:id
 * Update an employee (also supports new profilePicture upload)
 */
router.put(
  '/:id',
  upload.single('profilePicture'), // optional new picture
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        department,
        position,
        salary,
      } = req.body;

      const updates = {
        firstName,
        lastName,
        email,
        department,
        position,
        salary,
      };

      if (req.file) {
        updates.profilePicture = req.file.path;
      }

      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true } // return updated doc
      );

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      res.json(employee);
    } catch (error) {
      console.error('Update employee error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/**
 * DELETE /api/employees/:id
 * Delete an employee
 */
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
