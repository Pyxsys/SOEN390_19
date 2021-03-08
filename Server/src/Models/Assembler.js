const mongoose = require('mongoose');

// Schema
const schedule_schema = mongoose.Schema({
    start: {type: Date, required: true},
    end:   {type: Date, required: true},
    task:  {type: String, required: true},
});

/** Assembles an amount of the specified bike up to 
 *  the requested amount (default 1) limited by the 
 *  available parts in the DB.
 *  Example calls:
 *      assembleBike("foobar",16);  - assembles 16 foobar bikes
 *      assembleBike("goonar");     - assembles 1 goonar bike
*/
function assembleBike(bike_id, requested_amount){
    //define
    if(typeof requested_amount === "undefined") {requested_amount = 1}
    // find bike in DB

    // start loop

        // find needed parts in db
        // found
            // subtract parts from db
            // add bike
        // not found
        // break
}

module.exports = mongoose.model('Assembler', schedule_schema);