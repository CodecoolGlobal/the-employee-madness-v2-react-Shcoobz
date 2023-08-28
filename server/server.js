require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// importing routes
const employeeRoutes = require('./routes/employees.route');
const equipmentRoutes = require('./routes/equipment.route');
const favoriteBrandRoutes = require('./routes/favoriteBrand.route');

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error('Missing MONGO_URL environment variable');
  process.exit(1);
}

app.use(express.json());

// integration of routes
app.use('/api/employees', employeeRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/favoriteBrands', favoriteBrandRoutes);

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
    console.log('Try /api/employees route right now');
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
