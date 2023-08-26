const express = require('express');
const router = express.Router();
const EmployeeModel = require('../db/employee.model');

router.get('/', async (req, res) => {
  // console.log('Received query parameters:', req.query);

  const { level, position, arrange, pageNumber } = req.query;
  const filterConditions = {};
  const sortEmployee = {};

  // filtering
  if (level) {
    filterConditions.level = { $regex: `${level}`, $options: 'i' };
  }

  if (position) {
    filterConditions.position = { $regex: `${position}`, $options: 'i' };
  }

  if (arrange === 'name') {
    sortEmployee.name = 1;
  }

  if (arrange === 'level') {
    sortEmployee.level = 1;
  }

  if (arrange === 'position') {
    sortEmployee.position = 1;
  }

  if (arrange === 'equipment') {
    sortEmployee.equipment = 1;
  }

  // var skip = (selectedPage - 1 ) * pageSize;
  // pagination
  const entriesPerPage = parseInt(10);
  const currentPage = parseInt(pageNumber);
  const offset = (entriesPerPage - 1) * currentPage; // -1 avoids last page empty!

  const numOfEmployees = await EmployeeModel.countDocuments({});
  const unroundedPageCount = numOfEmployees / entriesPerPage;

  const totalPages = Math.ceil(parseInt(unroundedPageCount));

  const isPaginationActive = req.query.isPaginationActive === 'true';

  if (!isPaginationActive) {
    const employees = await EmployeeModel.find(filterConditions).sort(
      sortEmployee
    );
    return res.json({ employees });
  } else {
    const employees = await EmployeeModel.find(filterConditions)
      .limit(entriesPerPage)
      .skip(offset)
      .sort(sortEmployee);
    return res.json({ employees, totalPages });
  }
});

// Fetch all missing employees
router.get('/missing', async (req, res) => {
  try {
    const missingEmployees = await EmployeeModel.find({ attendance: false });
    return res.json({ employees: missingEmployees });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Failed to fetch missing employees.' });
  }
});

// http://localhost:8080/api/employees/search/robert
router.get('/search/:search', async (req, res) => {
  const employeeNameQuery = req.params.search.toString();

  const employees = await EmployeeModel.find({
    name: { $regex: employeeNameQuery, $options: 'i' },
  });

  return res.json(employees);
});

router.get('/:id', async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

router.post('/', async (req, res, next) => {
  const employee = req.body;
  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

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
