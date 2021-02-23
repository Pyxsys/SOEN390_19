
const mongoose = require('mongoose');
const business_schema = require('./Business.js');
var Business = mongoose.model('Business', business_schema);
var Client = Business.discriminator('Client', client_schema);

  // Schema
  const client_schema = mongoose.Schema({
    client_name: {type: String, required: true},
    client_title: {type: String, required: true}
});

module.exports = mongoose.model('Client', client_schema);