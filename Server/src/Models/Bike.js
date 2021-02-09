const mongoose = require('mongoose');

// Schema
const bike_schema = mongoose.Schema({
    internalId:       {type: String, required: true},
    //TODO add attributes
});

module.exports.Bikes = mongoose.model('Bikes', bike_schema);