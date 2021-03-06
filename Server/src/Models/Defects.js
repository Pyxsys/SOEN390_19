const mongoose = require('mongoose');

// Schema
const defect_schema = mongoose.Schema({
    defectId:           {type: String, required: true}, //Destinct from mongoDB ID, given by industry standard
    defectDescription:  {type: String, required: true}, //General description eg. handlebars, front fork, frame, pedal, seat, tires
    relatedItem:        {type: String, required: true}
});

module.exports.Defects = mongoose.model('Defects', part_schema);