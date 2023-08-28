/*
Loading the .env file and creates environment variables from it
*/
require('dotenv').config();
const mongoose = require('mongoose');
const names = require('./names.json');
const levels = require('./levels.json');
const positions = require('./positions.json');
const favoriteBrands = require('./favoriteBrands.json');

const EmployeeModel = require('../db/employee.model');
const FavoriteBrandModel = require('../db/favoriteBrand.model');

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error('Missing MONGO_URL environment variable');
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

let createdBrands;

const populateFavoriteBrand = async () => {
  await FavoriteBrandModel.deleteMany({});

  const brands = favoriteBrands.map((brand) => ({ name: brand }));

  createdBrands = await FavoriteBrandModel.create(...brands);
  console.log('FavoriteBrands created');
};

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    favoriteBrand: pick(createdBrands)._id,
  }));

  await EmployeeModel.create(...employees);
  console.log('Employees created');
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateFavoriteBrand();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
