/**
 * Bike part model includes internal id to identify bike part, a general description of 
 * the part type, price, number of part units, supplier, pdf file path, and step file path
 */

const mongoose = require('mongoose');

// Schema
const part_schema = mongoose.Schema({
    internalId:       {type: String, required: true, unique: true}, //Destinct from mongoDB ID, given by industry standard
    partType:         {type: String, required: true}, //General description eg. handlebars, front fork, frame, pedal, seat, tires
    price:            {type: Number, required: true},
    numberOfUnits:    {type: Number, required: true},
    provider:         {type: String, required: false},  //refer to supplier

    partDocPath:      {type: String, required: true}, //Path to .pdf file
    partStepPath:     {type: String, required: true}  //Path to .step file
});

module.exports.BikeParts = mongoose.model('BikeParts', part_schema);