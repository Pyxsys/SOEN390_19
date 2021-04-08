/**
 * Accounting form model for the DB, 
 * possesses an internalId, an item that refers to another object's InternalId as well as the amount of said item,
 * the price of the order and a client.
 */

const mongoose = require('mongoose');

// Schema
const accounting_schema = mongoose.Schema({ 
    internalId:         {type: String, required: true, unique: true}, //Destinct from mongoDB ID, given by industry standard
    item:               {type: String, required: true}, //the Id of the bike being bought
    price:              {type: Number, required: true},
    numberOfUnits:      {type: Number, required: true},
    client:             {type: String, required: false},  //refer to the person making the order
});

module.exports.Accounting = mongoose.model('Accounting', accounting_schema);