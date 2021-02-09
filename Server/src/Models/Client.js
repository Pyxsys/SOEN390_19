
const mongoose = require('mongoose');
const business_schema = require('./Business.js');

  
  const client_schema = mongoose.Schema({
    _id: { type: Number},
    name:       {type: String, required: true},
    phone:       {type: String, required: true},
    address:          {type: String, required: true},
    businessArr: [business_schema]
});

module.exports = mongoose.model('Client', client_schema);