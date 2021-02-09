const mongoose = require('mongoose');

// Schema
const business_schema = mongoose.Schema({
    business:       {type: String, required: true},
    clients:       {type: String, required: true},
    suppliers:          {type: String, required: true}
});

module.exports = mongoose.model('Business', business_schema);