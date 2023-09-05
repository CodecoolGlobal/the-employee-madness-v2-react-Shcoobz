// https://mongoosejs.com/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  firstName: String,
  middleName: String,
  lastName: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  attendance: {
    type: Boolean,
    default: false,
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
  },
  favoriteBrand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FavoriteBrand',
  },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
