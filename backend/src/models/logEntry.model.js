const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumber = {
  type: Number,
  required: true,
};

const logEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  image: String,
  date: Date,
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longtitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate: {
    type: Date,
    required: true,
  },
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);
module.exports = LogEntry;
