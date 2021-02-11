const mongoose = require('mongoose');
const business_schema = require('./Business.js');
var Business = mongoose.model('Business', business_schema);
var Supplier = Business.discriminator('Supplier', supplier_schema);


// Schema
const supplier_schema = mongoose.Schema({
    description: {type: String, required: true}
});
    

module.exports = mongoose.model('Supplier', supplier_schema);