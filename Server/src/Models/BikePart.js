const mongoose = require('mongoose');

// Schema
const part_schema = mongoose.Schema({
    internalId:       {type: String, required: true},
    //TODO add attributes
});

module.exports.BikeParts = mongoose.model('BikeParts', part_schema);