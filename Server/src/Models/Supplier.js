/**
 * Supplier model inherits Business model and includes business name, phone number,
 * location, supplier description, and catalogue information (unique id, number of units
 * available)
 */

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
    

module.exports.Suppliers             = mongoose.model('Suppliers', supplier_schema);
module.exports.SupplierCatalogues    = mongoose.model('SupplierCatalogues', catalogue_schema);