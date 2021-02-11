const mongoose = require('mongoose');
const business_schema = require('./Business.js');


// Schema
const supplier_schema = mongoose.Schema({

    businessArr: [business_schema]
});
    

module.exports = mongoose.model('Supplier', supplier_schema);