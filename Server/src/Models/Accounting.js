/**
 * Bike part model includes internal id to identify bike part, a general description of 
 * the part type, price, number of part units, supplier, pdf file path, and step file path
 */

const mongoose = require('mongoose');

// Schema
const accounting_schema = mongoose.Schema({ 
    internalId:         {type: String, required: true, unique: true}, //Destinct from mongoDB ID, given by industry standard
    item:               {type: String, required: true}, //the Id of the bike being bought
    price:              {type: Number, required: true},
    numberOfUnits:      {type: Number, required: true},
    client:             {type: String, required: false},  //refer to the person making the order
});

module.exports.BikeParts = mongoose.model('Accounting', accounting_schema);