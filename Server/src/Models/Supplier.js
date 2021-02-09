const mongoose = require('mongoose');
const business_schema = require('./Business.js');


// Schema
const supplier_schema = mongoose.Schema({
    name:       {type: String, required: true},
    phone:       {type: String, required: true},
    address:          {type: String, required: true},
    businessArr: [business_schema]
});
    

module.exports = mongoose.model('Supplier', supplier_schema);