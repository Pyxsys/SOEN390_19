const mongoose = require('mongoose');

// Schema
const assembler_schema = mongoose.Schema({
    start: {type: Number, required: true},
    end:       {type: Number, required: true},
    task:          {type: String, required: true},
});

module.exports = mongoose.model('Assembler', assembler_schema);