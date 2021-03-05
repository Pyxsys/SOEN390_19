const mongoose = require('mongoose');

// Schema
const schedule_schema = mongoose.Schema({
    start: {type: Date, required: true},
    end:   {type: Date, required: true},
    task:  {type: String, required: true},
});

module.exports = mongoose.model('Assembler', schedule_schema);