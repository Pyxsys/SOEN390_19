const mongoose = require('mongoose');

// Schema
const sale_schema = mongoose.Schema({
    customer:       {type: String, required: true},
    product:        {type: String, required: true},
    state:          {type: Boolean, required: true},
    order_number:   {type: Number, required: true}
});

module.exports = mongoose.model('Sales', sale_schema);