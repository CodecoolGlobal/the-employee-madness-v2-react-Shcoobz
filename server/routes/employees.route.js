const express = require('express');
const router = express.Router();
const EmployeeModel = require('../db/employee.model');

// GET all employees w/wo filter

router.get('/', async (req, res) => {
  const employees = await EmployeeModel.find({}).populate('favoriteBrand');
  return res.json(employees);
});

router.get('/filter', async (req, res) => {
  const { level, position } = req.query;
  let filterConditions = {};

  if (level) {
    filterConditions.level = { $regex: `${level}`, $options: 'i' };
  }

  if (position) {
    filterConditions.position = { $regex: `${position}`, $options: 'i' };
  }

  const employees = await EmployeeModel.find(filterConditions).populate('favoriteBrand');
  return res.json(employees);
});

router.get('/sort', async (req, res) => {
  const { arrange, sortByName } = req.query;
  let sortCriteria = {};

  if (arrange) {
    sortCriteria[arrange] = 1;
  }

  if (sortByName) {
    if (sortByName === 'asc') {
      sortCriteria.name = 1;
    } else if (sortByName === 'des') {
      sortCriteria.name = -1;
    }
  }

  const employees = await EmployeeModel.find({})
    .populate('favoriteBrand')
    .sort(sortCriteria);
  return res.json(employees);
});

// GET all missing employees
router.get('/missing', async (req, res) => {
  const missingEmployees = await EmployeeModel.find({
    attendance: false,
  }).populate('favoriteBrand');

  return res.json({ employees: missingEmployees });
});

// GET all employees by name search
// http://localhost:8080/api/employees/search/robert
router.get('/search/:search', async (req, res) => {
  const employeeNameQuery = req.params.search.toString();

  const employees = await EmployeeModel.find({
    name: { $regex: employeeNameQuery, $options: 'i' },
  }).populate('favoriteBrand');

  return res.json(employees);
});

// GET employee by ID
router.get('/:id', async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id).populate('favoriteBrand');

  return res.json(employee);
});

// POST employee (create)
router.post('/', async (req, res, next) => {
  const employee = req.body;
  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

// PATCH employee by ID (change)
router.patch('/:id', async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

// DELETE employee by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
