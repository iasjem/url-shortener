const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
  "_id": String,
  "original_url": String,
  "short_url": String,
});

const URL = mongoose.model('URL', URLSchema);

module.exports = { URL };