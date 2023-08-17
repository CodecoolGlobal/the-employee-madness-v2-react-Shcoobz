const express = require('express');
const EmployeeModel = require('../db/employee.model');

const router = express.Router();

// GET all employees with filters
router.get('/', async (req, res) => {
  const { position, level, sortField, sortOrder } = req.query;

  let filter = {};

  if (position) {
    filter.position = { $regex: position, $options: 'i' };
  }

  if (level) {
    filter.level = { $regex: level, $options: 'i' };
  }

  const sortQuery = {};
  if (
    sortField &&
    sortOrder &&
    !['firstName', 'middleName', 'lastName'].includes(sortField)
  ) {
    sortQuery[sortField] = sortOrder === 'asc' ? 1 : -1;
  }

  let employees = await EmployeeModel.find(filter).sort(sortQuery);

  employees = employees.map((employee) => {
    const employeeObject = employee.toObject(); // convert Mongoose document to plain object
    const names = employee.name.split(' ');
    return {
      ...employeeObject, // spread existing document fields
      firstName: names[0] || '',
      middleName: names.length > 2 ? names[1] : '', // only set middle name if there are 3 names
      lastName: names.length > 1 ? names[names.length - 1] : '', // last name can be the second or third name
    };
  });

  // Sort in JavaScript if sorting by firstName, middleName, or lastName
  if (['firstName', 'middleName', 'lastName'].includes(sortField)) {
    const modifier = sortOrder === 'asc' ? 1 : -1;
    employees.sort(
      (a, b) => a[sortField].localeCompare(b[sortField]) * modifier
    );
  }

  return res.json(employees);
});

router.get('/:id', async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

// GET :search with postman/browser at: http://localhost:8080/api/employees/search/robert
router.get('/search/:search', async (req, res) => {
  const searchValue = req.params.search;

  let filter = {
    name: { $regex: searchValue, $options: 'i' },
  };

  const employees = await EmployeeModel.find(filter);

  return res.json(employees);
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
