const express = require('express');
const router = express.Router();
const Part = require('../../Models/BikePart.js');
const Bike = require('../../Models/Bike.js');

/*
LINKED ROOT: /inventory
 */
var part_route = '/partinventory';

// Functions
function genFilePathFromRequest(request){
    var doc_path = `${process.cwd()}\\..\\Data\\BikeParts\\${request.body.internalId}-info.pdf`;
    var step_path = `${process.cwd()}\\..\\Data\\BikeParts\\${request.body.internalId}-step.step`;

    //Move external files to location
    //TODO

    return {
        docPath: doc_path,
        stepPath: step_path
    };
}

// Routes-------------------------

/** GET
 *  Returns and displays all bike parts.
 */
router.get(part_route, async (req, res) => {
    try{
        const parts = await Part.BikeParts.find({},'internalId partDocPath partStepPath');   //returns only usernames + emails of users form db
        res.json(parts);    //returns all found parts
    } catch(err){
        console.log(`> failed: ${err}`);
        res.status(500).json(`{message: failed at retrieval}`);
    }
});

/** POST
 *  Adds BikePart to DB
 * */
router.post(part_route, async (req, res) => {
    //DEBUG  console.log('> request body:');
    //DEBUG  console.log(req.body);  

    //Create paths for external files
    var document_paths = genFilePathFromRequest(req);

    // Create new part instance with posted json
    const newpart = new Part.BikeParts({
        internalId:       req.body.internalId, //Destinct from mongoDB ID, given by industry standard
        partType:         req.body.partType,   //General description eg. handlebars, front fork, frame, pedal, seat, tires
        price:            req.body.price,
        numberOfUnits:    req.body.numberOfUnits,
        provider:         req.body.provider,

        //generated the local paths for uploaded files
        partDocPath:     document_paths.docPath,    //Path to .pdf file
        partStepPath:    document_paths.stepPath    //Path to .step file
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
 *  update a part
 */
router.patch(`${part_route}/:part_id`, async (req,res) =>{
    try {
        
        const entries = Object.keys(req.body);
        const updates = {};

        // constructs dynamic query with the given request body elements
        for (let i = 0; i < entries.length; i++) {
            updates[entries[i]] = Object.values(req.body)[i];
        }
        
        var updated_part = await Part.BikeParts.findOneAndUpdate(
            { "internalId": req.params.part_id }, 
            { $set: updates },
            { 
                new: true,                  //returns updated entry
                useFindAndModify: false     //appease mongoose dep-warnings
            } 
        );

        //Update old files if applicable
        if(req.body.files != null){
            console.log('> Updating related auxilliary files ...');
            const document_paths = genFilePathFromRequest(req); //Create paths for external files
            
            //update auxiliarry documetn path fields in collection
            updated_part = await Part.BikeParts.findOneAndUpdate(
                { "_id": updated_part._id}, 
                { $set: {
                    partDocPath: document_paths.docPath,  
                    partStepPath: document_paths.stepPath
                }},
                { 
                    new: true,                  //returns updated entry
                    useFindAndModify: false     //appease mongoose dep-warnings
                } 
            );
        }
        
        // Reaching here -> success
        console.log(`> part: ${JSON.stringify(updated_part.internalId)} was updated.`);
        res.json(`{message: updated part in DB}`); // returns message about updated part
        

    } catch(err){
        res.status(400).json(`{message: part could not be found or bad request}`); // return error
        console.log(`> failed: ${err}`);
        console.log(`> part: '${req.params.part_id}' could not be updated.`);
    }

});

/** DELETE
 *  deletes a specific part 
 */
//TODO

// -------------------------------
module.exports = router;