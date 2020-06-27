const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({
  place_name: {
    type: String
  },
  address: {
    type: String
  },
  money_per_day: {
    type: Number,
  },
  category: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model('place', placeSchema);
