const mongoose = require('mongoose');
const Business = require('./Business.js');



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

var Supplier = Business.discriminator('Supplier', supplier_schema);
    

module.exports.Supplier             = mongoose.model('Supplier', supplier_schema);
module.exports.SupplierCatalogue    = mongoose.model('SupplierCatalogue', catalogue_schema);