const mongoose = require('mongoose');
const business_schema = require('./Business.js');


// Schema
const supplier_schema = mongoose.Schema({
    name:       {type: String, required: true},
    password:       {type: String, required: true},
    email:          {type: String, required: true},
    businessArr: [business_schema]
});
    

module.exports = mongoose.model('Supplier', supplier_schema);