const mongoose = require('mongoose');
const business_schema = require('./Business.js');


// Schema
const supplier_schema = mongoose.Schema({
    _id: { type: Number},
    name:       {type: String, required: true},
    phone:       {type: String, required: true},
    location:          {type: String, required: true},
    businessArr: [business_schema]
});
    

module.exports = mongoose.model('Supplier', supplier_schema);