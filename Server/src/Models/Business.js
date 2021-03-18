/**
 * Business model is a parent to client and supplier models and includes business name,
 * phone number, and location
 */

const mongoose = require('mongoose');

// Schema
const business_schema = mongoose.Schema({
    name: {type: String, required: true},
    phone:       {type: String, required: true},
    location:          {type: String, required: true},
});

module.exports = mongoose.model('Business', business_schema);