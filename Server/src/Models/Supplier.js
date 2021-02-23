const mongoose = require('mongoose');
const business_schema = require('./Business.js');
var Business = mongoose.model('Business', business_schema);
var Supplier = Business.discriminator('Supplier', supplier_schema);

// catalogue Schema
const catalogue_schema = mongoose.Schema({
    internalId:        {type: String, required: true},   //Destinct from mongoDB ID, given by industry standard
    availableUnits:    {type: Number, required: true}    //number of the unit available
});

// Schema
const supplier_schema = mongoose.Schema({
    description: {type: String, required: true},
    catalogue: [catalogue_schema]
});
    

module.exports = mongoose.model('Supplier', supplier_schema);