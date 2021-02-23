const mongoose = require('mongoose');

// Schema
const part_schema = mongoose.Schema({
    internalId:       {type: String, required: true}, //Destinct from mongoDB ID, given by industry standard
    partType:         {type: String, required: true}, //General description eg. handlebars, front fork, frame, pedal, seat, tires
    price:            {type: Number, required: true},
    number_Of_Units:  {type: Number, required: true},
    provider:         {type: String, required: false},

    partDocPath:      {type: String, required: true}, //Path to .pdf file
    partDocStep:      {type: String, required: true}  //Path to .step file
});

module.exports.BikeParts = mongoose.model('BikeParts', part_schema);