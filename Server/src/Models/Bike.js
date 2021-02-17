const mongoose = require('mongoose');
const bikePart = require('BikePart.js');

// Schema
const bike_schema = mongoose.Schema({
    internalId:       {type: String, required: true},
    type:             {type: String, required: true},   //general descriptor eg. mountain bike
    price:            {type: Number, required: true},
    number_Of_Units:  {type: Number, required: true},
    provider:         {type: String, required: false},

    BikeDocPath:      {type: String, required: true},   //Path to .pdf file
    PartsList: {
        type: [BikeParts],  //array of bikeParts
        default: undefined  //default to undefined instead of empty array
    }
});

module.exports.Bikes = mongoose.model('Bikes', bike_schema);