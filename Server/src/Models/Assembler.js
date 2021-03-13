/**
 * Assembler model includes a start time and end time of the scheduled assembling task.
 * Contains a function to check if parts are still available and a function to assemble
 * the bike using bike id and requested amount.
 */

const mongoose = require('mongoose');
const Part = require('./BikePart.js');
const Bike = require('./Bike.js');

// Schema
const schedule_schema = mongoose.Schema({
    start: {type: Date, required: true},
    end:   {type: Date, required: true},
    task:  {type: String, required: true},
});

/**Ensures there are enough parts to to assemble 'requested_amount' amount of bikes 
 * defined by the parts list. returns a json describing the state of the parts database
 * and how many bikes could be produced. The state of insufficient_parts informs that 
 * there isnt enough parts to produce an amount equal to requested_amount but enoughy to 
 * produce at least one bike from f=the parts list.
 * 
 * An error is thorwn if there isn't enough parts to produce a single bike.
 * 
 * Returns a JSON of the following format:
 *      {
 *          "min_possible_assemblies": [Number],
            "parts": Array [
                {
                    "internalId":   [String],
                    "available":    [Number], 
                    "needed":       [Number]
                }
            ]
            "insufficient_parts": [Boolean]
 *      }
 * 
 * @param {Part Array} partsList 
 */
async function ensurePartsAvailable(partsList, requested_amount){

    let part_info_list = [];
    let min_possible_assemblies = requested_amount;
    let insufficient_parts = false;

    for( const Element of partsList){
        // find needed parts in db
        let part = await Part.BikeParts.findOne({ internalId: Element.partInternalId });
        // throw error if part not found
        if(part.internalId === "undefined"){throw new Error(`Could not find part: ${Element.partInternalId}`);}
        else {
            let parts_available = part.numberOfUnits;
            let parts_needed_per_bike = Element.amountRequired;
            
            //throw error if there are insufficent parts to produce a bike.
            if (parts_available < parts_needed_per_bike){throw new Error(`Insufficient parts to produce a single bike.`);}

            //compute integer amount of bikes possible to be assembled with available part
            let assemblies_possible_with_part = 
                (parts_available - parts_available % parts_needed_per_bike) / parts_needed_per_bike;
            
            //then check to see if that value is less than the current min_possible_assemblies
            if(assemblies_possible_with_part < min_possible_assemblies){ 
                min_possible_assemblies = assemblies_possible_with_part;
                insufficient_parts = true;
            }

            var part_info = {
                "internalId": part.internalId,
                "available": parts_available, 
                "needed": parts_needed_per_bike * requested_amount
            };
            part_info_list.push(part_info);
        }
    }

    //set result json
    var result = {
        "min_possible_assemblies": min_possible_assemblies,
        "part_info_list": part_info_list,
        "insuffient_parts": insufficient_parts 
    };
    return result;
}

/** Assembles an amount of the specified bike up to 
 *  the requested amount (default 1) limited by the 
 *  available parts in the DB.
 *  Example calls:
 *      assembleBike("foobar",16);  - assembles 16 foobar bikes
 *      assembleBike("goonar");     - assembles 1 goonar bike
 * @param {String} bike_id - internalID of the desire bike to be assembled.
 * @param {Number} requested_amount - amount of specified bike to be assembled, default to 1. 
*/
async function assembleBike(bike_id, requested_amount){
    try{
        // define amount if undefined
        if(typeof requested_amount === "undefined") {requested_amount = 1;}
        if(requested_amount < 1){ throw new Error(`invalid requested amount: ${requested_amount}`);}
        console.log(`> Starting process to assemble ${requested_amount} ${bike_id} model(s).`);
    
        // find bike in DB
        const bike_model = await Bike.Bikes.findOne({ internalId: bike_id });

        // Ensure sufficient parts are available
        let check_result = ensurePartsAvailable(bike_model.partsList, requested_amount)
        .then(res => {
            
            //console.log(res)
            //display warning if there are insufficient parts to complete inital request but enough to make some
            if(res.insuffient_parts){
                console.log("\x1b[33m%s\x1b[0m", `   WARNING: Cannot assemble requested amount of bikes due to insufficient parts.`);
                console.log("\x1b[33m%s\x1b[0m", `   Assembling ${res.min_possible_assemblies} ${bike_model.internalId} instead.`);
                requested_amount = res.min_possible_assemblies;
            }
        
            //Contact Machine/Assembler (does nothing).
            let filepath = bike_model.bikeDocPath;
            /*
            someMachine.loadInstructions(filepath)
            .then(machineResponse => {})
            .catch(err => err);
            */
           
            //updating options declaration
            var options = { useFindAndModify: false }    //appease mongoose dep-warnings

            // subtract parts from db
            let i = 0;  //done to appease mongoose
            for( const Element of bike_model.partsList){

                //new amount after subtracting the amount of parts to be used.
                let needed_amount = Element.amountRequired * requested_amount;
                let updated_amount = res.part_info_list[i].available - needed_amount;
                i++;
                
                Part.BikeParts.findOneAndUpdate(
                    { internalId: Element.partInternalId },
                    { $set: {numberOfUnits: updated_amount} },
                    options
                ).exec();
                console.log(`   ... Removed ${needed_amount} ${Element.partInternalId} part(s).`);
            }

            // add bike
            let updated_amount = bike_model.numberOfUnits + requested_amount;
            Bike.Bikes.findOneAndUpdate(
                { internalId: bike_model.internalId }, 
                { $set: {numberOfUnits: updated_amount} },
                options
            ).exec();
            console.log("\x1b[32m%s\x1b[0m", `   ... Added ${requested_amount} ${bike_model.internalId} bike(s).`, "");
        })
        .catch(err => console.log("\x1b[31m%s\x1b[0m", `> ${err}`,""));
        
    } catch(err) {
        console.log("\x1b[31m", `> failed: ${err}`);
        console.log(err);;
    }
}

module.exports.Schedules = mongoose.model('Schedules', schedule_schema);
module.exports.assembleBike = assembleBike;