const express = require('express');
const router = express.Router();
const Part = require('../../Models/BikePart.js');
const Bike = require('../../Models/Bike.js');

// Routes-------------------------

/** GET
 *  Returns and displays all bike parts.
 */
//TODO

/** POST
 *  Adds BikePart to DB
 * */
router.post('/partinventory', async (req, res) => {
    //DEBUG  console.log('> request body:');
    //DEBUG  console.log(req.body);  

    //create paths for external files
    var doc_path = `${process.cwd()}\\..\\Data\\BikeParts\\${req.body.internalId}-info.pdf`;
    var step_path = `${process.cwd()}\\..\\Data\\BikeParts\\${req.body.internalId}-step.step`;

    //move external files to location
    //TODO

    // Create new part instance with posted json
    const newpart = new Part.BikeParts({
        internalId:       req.body.internalId, //Destinct from mongoDB ID, given by industry standard
        partType:         req.body.partType,   //General description eg. handlebars, front fork, frame, pedal, seat, tires
        price:            req.body.price,
        numberOfUnits:    req.body.numberOfUnits,
        provider:         req.body.provider,

        //auto generate the local for uploaded files
        partDocPath:      doc_path, //Path to .pdf file
        partStepPath:     step_path  //Path to .step file
    });
    
    console.log(newpart);
    
    // Save new part instance to db
    try{
        const saved_part = await newpart.save();
        res.json(`{message: added part '${saved_part.internalId}' to DB}`);
        console.log('> added part successfully.');
    } catch(err) {
        console.log(`> failed: ${err}`);
        res.status(400).json({message: err});           // return error
        console.log('> part not added.');
    }
});

/** PATCH
 *  update a user
 */
//TODO

/** DELETE
 *  deletes a specific user * 
 */
//TODO

// -------------------------------
module.exports = router;