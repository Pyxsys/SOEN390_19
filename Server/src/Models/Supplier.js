const mongoose = require('mongoose');
const business_schema = require('./Business.js');
//Below causes issues, commented out to allow work on adjacent issue. Related Bug
/*
var Business = mongoose.model('Business', business_schema);
var Supplier = Business.discriminator('Supplier', supplier_schema);
//*/

// Catalogue Schema
const catalogue_schema = mongoose.Schema({
    internalId:        {type: String, required: true},   //Destinct from mongoDB ID, given by industry standard
    availableUnits:    {type: Number, required: true}    //number of the unit available
});

// Schema
const supplier_schema = mongoose.Schema({
    description: {type: String, required: true},
    catalogue: [catalogue_schema]
});
    

module.exports.Supplier             = mongoose.model('Supplier', supplier_schema);
module.exports.SupplierCatalogue    = mongoose.model('SupplierCatalogue', catalogue_schema);