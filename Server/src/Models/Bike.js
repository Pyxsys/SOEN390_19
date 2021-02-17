const mongoose = require('mongoose');

// Schema
const bike_schema = mongoose.Schema({
    internalId:       {type: String, required: true},
    type:             {type: String, required: true},   //general descriptor eg. mountain bike
    price:            {type: Number, required: true},
    number_Of_Units:  {type: Number, required: true},
    provider:         {type: String, required: false},

    BikeDocPath:      {type: String, required: true} //Path to .pdf file
});

module.exports.Bikes = mongoose.model('Bikes', bike_schema);