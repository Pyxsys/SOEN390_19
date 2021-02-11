
const mongoose = require('mongoose');
const business_schema = require('./Business.js');

  // Schema
  const client_schema = mongoose.Schema({
    businessArr: [business_schema]
});

module.exports = mongoose.model('Client', client_schema);