const mongoose = require('mongoose');

// Schema
const user_schema = mongoose.Schema({
    username:       {type: String, required: true},
    password:       {type: String, required: true},
    email:          {type: String, required: true}
});

module.exports = mongoose.model('Users', user_schema);