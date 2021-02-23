
const mongoose = require('mongoose');
const Business = require('./Business.js');

  // Schema
  const client_schema = mongoose.Schema({
    client_name: {type: String, required: true},
    client_title: {type: String, required: true}
});

var Client = Business.discriminator('Client', client_schema);

module.exports = mongoose.model('Client', client_schema);