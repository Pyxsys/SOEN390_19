const mongoose = require('mongoose');

// Schema
const bike_schema = mongoose.Schema({
    internalId:       {type: String, required: true},   //Destinct from mongoDB ID, given by industry standard
    type:             {type: String, required: true},   //general descriptor eg. mountain bike
    price:            {type: Number, required: true},
    numberOfUnits:    {type: Number, required: true},
    provider:         {type: String, required: false},  //refer to supplier

    bikeDocPath:      {type: String, required: true},   //Path to .pdf file
    partsList: {
        type: [String],     //array of bikeParts, refers to internal IDs
        default: undefined  //default to undefined instead of empty array
    }
});

module.exports.Bikes = mongoose.model('Bikes', bike_schema);
