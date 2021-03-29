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
    task:  {type: String, required: true}   //internalId of item
});

/**Schecule class
 * Provides a start and end time and a bike model to assemble.
 */
class Schedule {
    /**
     * Creates a new instance of a schedule.
     * @param {Date} start 
     * @param {Date} end 
     * @param {String} bike_internal_id 
     */
    constructor(start_date, end_date, bike_internal_id){
        this._start = start_date;
        this._end = end_date;
        this._task = bike_internal_id;
    }

    // Getters
    get start()     { return this._start; }
    get end()       { return this._end; }
    get task()      { return this._task; }
    get bikeID()    { return this._task; }

    //Methods

    /**
     * Computes the length of time for the task in days.
     * @returns {Number} number of days
     */
    calcDuration(){ 
        const diffTime = Math.abs(this.end - this.start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
}

/** Assembler class
 * Using a schedule, will execute assemblies over a period of time.
 * 
*/
class Assembler {
    /**
     * Creates a new instance of an assembler.
     * @param {String} name - name of assembler
     * @param {Schedule} schedule - schedule
     * @param {Number} rate - integer amount of bikes to be produced in a day
     */
    constructor(name, schedule, rate){
        this._name = name;
        this._schedule = schedule;   //json schedule, see schedule_schema
        this._rate = rate;           //expected number of bikes produced per day (bot dependent)
        this._produced = 0;          //amount of bikes produced

        console.log("\x1b[32m%s\x1b[0m", `> [Server] Created new Assembler instance: '${this.name}'`);
    }

    // Getters
    get name()                  { return this._name; }
    get start()                 { return this._schedule.start; }
    get end()                   { return this._schedule.end; }
    get rate()                  { return this._rate; }
    get duration()              { return this._schedule.calcDuration(); }
    get bikeModel()             { return this._schedule.task; }
    get expectedProduction()    { return this.calcExpectedProduction(); }
    get produced()              { return this._produced; }
    get state()                 { return `(Assembler: ${this.name}) ${this.produced}/${this.expectedProduction} bikes assembled.`; }
    get stateAsJson()           { return `{assembler: ${this.name}, produced: ${this.produced}, expected: ${this.expectedProduction}}`; }

    //Methods

    /**
     * Computes the expected amount of bikes to be produced over the span of the task
     * @returns 
     */
    calcExpectedProduction() { return this.duration * this.rate; }

    /**TODO
     * Simulates Assembling bikes over the course of time according to the schedule and rate.
     * [Use of observers strongly considered]
     */
    run(){
        //declare/define variables
        let job_finished = false;       //lets the assembler know if all bikes have been assembled
        let job_halted = false;         //lets assembler know if there are delays
        const target_model = await Bike.Bikes.findOne({ internalId: this._schedule.bikeID });
        if(target_model === null) {     //ensures model is valid
            console.log("\x1b[31m", `> failed: Bike model not found.`);
            break; 
            }    

        //produce unique order number?

        //create assembly job and submit to db?

        //start assemblies
        console.log(`(${this.name}) Machine has started new manufacturing order:`);
        
        while(!job_finished){
        
            //Determine if at rate tick-over (would a bike be done at this time?/has a day passed)
            if((!job_halted) && true){
                try{
                    //determine number of bikes to be assembled
                    let batch_amount = (this.rate < this.expectedProduction - this.produced) ? this.rate : this.expectedProduction - this.produced ;

                    //ensure parts available
                    parts_check = await ensurePartsAvailable(target_model.partsList, batch_amount);

                    //assemble bike.
                    this.produced += assembleBike(this._schedule.bikeID);

                } catch(err) { 
                    //on errors, halt job
                    job_halted = true; 
                } 

                //is job done?
                if(this.produced === this.expectedProduction){
                    job_finished = true;
                }

            }
            
            //if job is halted
            if(job_halted) {
                //check if parts are now available
            }
        }

        console.log(`(${this.name}) Machine has finished manufacturing order:`);
        
    }
}

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
 * @param {Number} requested_amount - amount of specified bike to be assembled. 
 */
async function ensurePartsAvailable(partsList, requested_amount){

    let part_info_list = [];
    let min_possible_assemblies = requested_amount;
    let insufficient_parts = false;

    for( const Element of partsList){
        // find needed parts in db
        let part = await Part.BikeParts.findOne({ internalId: Element.partInternalId });
        // throw error if part not found
        if(part === null){throw new Error(`Could not find part: ${Element.partInternalId}`);}
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
            return requested_amount;    //push assembled amount up
        })
        .catch(err => {
            console.log("\x1b[31m%s\x1b[0m", `> ${err}`,"");
            return 0;   //no bikes assembled
        });
        
        return check_result; //return number of assembeld bikes to caller

    } catch(err) {
        console.log("\x1b[31m", `> failed: ${err}`);
        console.log(err);
        return 0;   //no bikes assembled

    }
}

module.exports.Schedule = Schedule;
module.exports.Assembler = Assembler;
module.exports.Schedules = mongoose.model('Schedules', schedule_schema);
module.exports.assembleBike = assembleBike;
module.exports.ensurePartsAvailable = ensurePartsAvailable;
