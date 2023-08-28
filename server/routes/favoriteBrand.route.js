const express = require('express');
const router = express.Router();
const FavoriteBrand = require('../db/favoriteBrand.model');

// GET all favorite brands
router.get('/', async (req, res) => {
  const brands = await FavoriteBrand.find();
  res.json(brands);
});

module.exports = router;
