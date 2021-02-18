const mongoose = require('mongoose');

// Schema
const business_schema = mongoose.Schema({
    name: {type: String, required: true},
    phone:       {type: String, required: true},
    location:          {type: String, required: true},
});

module.exports = mongoose.model('Business', business_schema);