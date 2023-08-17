const express = require('express');
const EquipmentModel = require('../db/equipment.model');

const router = express.Router();

// GET all equipment with filters
router.get('/', async (req, res) => {
  const { name, type, sortField, sortOrder } = req.query;

  let filter = {};

  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }

  if (type) {
    filter.type = { $regex: type, $options: 'i' };
  }

  const equipment = await EquipmentModel.find(filter).sort({
    [sortField]: sortOrder === 'asc' ? 1 : -1,
  });
  
  return res.json(equipment);
});

// GET single equipment by ID
router.get('/:id', async (req, res) => {
  const equipment = await EquipmentModel.findById(req.params.id);
  return res.json(equipment);
});

// POST new equipment
router.post('/', async (req, res) => {
  const newEquipment = new EquipmentModel(req.body);
  const saved = await newEquipment.save();
  return res.json(saved);
});

// PATCH update equipment by ID
router.patch('/:id', async (req, res) => {
  const updatedEquipment = await EquipmentModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  return res.json(updatedEquipment);
});

// DELETE equipment by ID
router.delete('/:id', async (req, res) => {
  const deletedEquipment = await EquipmentModel.findByIdAndRemove(
    req.params.id
  );
  return res.json(deletedEquipment);
});

module.exports = router;
