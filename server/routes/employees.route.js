const express = require('express');
const router = express.Router();
const EmployeeModel = require('../db/employee.model');

router.get('/', async (req, res) => {
  const { level, position, arrange } = req.query;
  const filterConditions = {};
  const sortEmployee = {};

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

  const employees = await EmployeeModel.find(filterConditions).sort(
    sortEmployee
  );
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
