const express = require('express');
const router = express.Router();
const EquipmentModel = require('../db/equipment.model');

// GET all equipment
router.get('/', async (req, res) => {
  const equipments = await EquipmentModel.find().sort({ created: 'desc' });
  return res.json(equipments);
});

// GET equipment by ID
router.get('/:id', async (req, res) => {
  const equipment = await EquipmentModel.findById(req.params.id);
  return res.json(equipment);
});

// POST equipment (create)
router.post('/', async (req, res, next) => {
  const equipment = req.body;
  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

// PATCH equipment by ID (change)
router.patch('/:id', async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(equipment);
  } catch (err) {
    return next(err);
  }
});

// DELETE equipment by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
