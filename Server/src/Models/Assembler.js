const mongoose = require('mongoose');

// Schema
const assembler_schema = mongoose.Schema({
    start: {type: Date, required: true},
    end:   {type: Date, required: true},
    task:  {type: String, required: true},
});

module.exports = mongoose.model('Assembler', assembler_schema);