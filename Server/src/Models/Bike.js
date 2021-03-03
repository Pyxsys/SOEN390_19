const mongoose = require('mongoose');

const part_list_schema = mongoose.Schema({
    partInternalId: {type: String, required: true},
    amountRequired: {type: Number, default: 1}
})

// Schema
const bike_schema = mongoose.Schema({
    internalId:       {type: String, required: true, unique: true},   //Destinct from mongoDB ID, given by industry standard
    type:             {type: String, required: true},   //general descriptor eg. mountain bike
    price:            {type: Number, required: true},
    numberOfUnits:    {type: Number, required: true},
    provider:         {type: String, required: false},  //refer to supplier

    bikeDocPath:      {type: String, required: true},   //Path to .pdf file
    partsList: {
        type: [part_list_schema],   //array of bikeParts, refers to internal IDs
        default: undefined          //default to undefined instead of empty array
    }
});

module.exports.Bikes = mongoose.model('Bikes', bike_schema);
