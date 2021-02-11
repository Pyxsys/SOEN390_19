const mongoose = require('mongoose');

// Schema
const part_schema = mongoose.Schema({
    internalId:       {type: String, required: true},
    partType:             {type: String, required: true},//potential parts include: handlebars, front fork, frame, pedal, seat, tires
    price:            {type: Number, required: true},
    number_Of_Units:  {type: Number, required: true},
    provider:         {type: String, required: true}
    //TODO add attributes
});

module.exports.BikeParts = mongoose.model('BikeParts', part_schema);