const express = require('express');
const router = express.Router();
const Part = require('../../Models/BikePart.js');
const Bike = require('../../Models/Bike.js');
const Supplier = require('../../Models/Supplier.js');

/*
LINKED ROOT: /inventory
 */
const part_route = '/partinventory';
const bike_route = '/bikeinventory';

// Functions
function genFilePathFromRequest(request,data_path){
    var doc_path = `${process.cwd()}\\..\\Data\\${data_path}\\${request.body.internalId}-info.pdf`;
    var step_path = `${process.cwd()}\\..\\Data\\${data_path}\\${request.body.internalId}-step.step`;

    //Move external files to location
    //TODO

    return {
        docPath: doc_path,
        stepPath: step_path
    };
}

// Routes-------------------------
// ------BikeParts----------------

/** PART - GET
 *  Returns and displays all bike parts.
 */
router.get(part_route, async (req, res) => {
    try{
        const parts = await Part.BikeParts.find({},'internalId partDocPath partStepPath');
        res.json(parts);    //returns all found parts
    } catch(err){
        console.log(`> failed: ${err}`);
        res.status(500).json(`{message: failed at retrieval}`);
    }
});

/** PART - POST
 *  Adds BikePart to DB
 * */
router.post(part_route, async (req, res) => {
    //DEBUG  console.log('> request body:');
    //DEBUG  console.log(req.body);  

    //Create paths for external files
    var document_paths = genFilePathFromRequest(req,"BikeParts");

    // Create new part instance with posted json
    const new_part = new Part.BikeParts({
        internalId:       req.body.internalId, //Destinct from mongoDB ID, given by industry standard
        partType:         req.body.partType,   //General description eg. handlebars, front fork, frame, pedal, seat, tires
        price:            req.body.price,
        numberOfUnits:    req.body.numberOfUnits,
        provider:         req.body.provider,

        //generated the local paths for uploaded files
        partDocPath:     document_paths.docPath,    //Path to .pdf file
        partStepPath:    document_paths.stepPath    //Path to .step file
    });
    
    console.log(new_part);
    
    // Save new part instance to db
    try{
        const saved_part = await new_part.save();
        res.json(`{message: added part '${saved_part.internalId}' to DB}`);
        console.log('> added part successfully.');
    } catch(err) {
        console.log(`> failed: ${err}`);
        res.status(400).json({message: err});           // return error
        console.log('> part not added.');
    }
});

/** PART - PATCH
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
            const document_paths = genFilePathFromRequest(req,"BikeParts"); //Create paths for external files
            
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

/** PART - DELETE
 *  deletes a specific part 
 */
//TODO

// ------Bikes----------------

/** BIKE - GET
 *  Returns and displays all bikes.
 */
router.get(bike_route, async (req, res) => {
    try{
        const bikes = await Bike.Bikes.find({},'internalId bikeDocPath');
        res.json(bikes);    //returns all found bikes
    } catch(err){
        console.log(`> failed: ${err}`);
        res.status(500).json(`{message: failed at retrieval}`);
    }
});

/** BIKE - POST
 *  Adds Bike to DB
 * */
router.post(bike_route, async (req, res) => {

    //Create paths for external files
    var document_paths = genFilePathFromRequest(req,"Bikes");

    // Create new part instance with posted json
    const new_bike = new Bike.Bikes({
        internalId:       req.body.internalId,
        type:             req.body.type,   
        price:            req.body.price,
        numberOfUnits:    req.body.numberOfUnits,
        provider:         req.body.provider,

        //generated the local paths for uploaded files
        bikeDocPath:      document_paths.docPath,    //Path to .pdf file
        partsList:        req.body.partsList
    });
    
    console.log(new_bike);
    
    // Save new bike instance to db
    try{
        const saved_bike = await new_bike.save();
        res.json(`{message: added part '${saved_bike.internalId}' to DB}`);
        console.log('> added part successfully.');
    } catch(err) {
        console.log(`> failed: ${err}`);
        res.status(400).json({message: err});           // return error
        console.log('> part not added.');
    }
});

/** BIKE - PATCH
 *  update a bike
 */
router.patch(`${bike_route}/:bike_id`, async (req,res) =>{
    try {
        
        const entries = Object.keys(req.body);
        const updates = {};

        // constructs dynamic query with the given request body elements
        for (let i = 0; i < entries.length; i++) {
            updates[entries[i]] = Object.values(req.body)[i];
        }
        
        var updated_bike = await Bike.Bikes.findOneAndUpdate(
            { "internalId": req.params.bike_id }, 
            { $set: updates },
            { 
                new: true,                  //returns updated entry
                useFindAndModify: false     //appease mongoose dep-warnings
            } 
        );

        //Update old files if applicable
        if(req.body.files != null){
            console.log('> Updating related auxilliary files ...');
            const document_paths = genFilePathFromRequest(req,"Bikes"); //Create paths for external files
            
            //update auxiliarry documetn path fields in collection
            updated_bike = await Bike.Bikes.findOneAndUpdate(
                { "_id": updated_bike._id}, 
                { $set: {
                    bikeDocPath: document_paths.docPath,  
                }},
                { 
                    new: true,                  //returns updated entry
                    useFindAndModify: false     //appease mongoose dep-warnings
                } 
            );
        }
        
        // Reaching here -> success
        console.log(`> part: ${JSON.stringify(updated_bike.internalId)} was updated.`);
        res.json(`{message: updated bike in DB}`); // returns message about updated part
        

    } catch(err){
        res.status(400).json(`{message: part could not be found or bad request}`); // return error
        console.log(`> failed: ${err}`);
        console.log(`> bike: '${req.params.bike_id}' could not be updated.`);
    }

});

/** BIKE - DELETE
 *  deletes a specific bike 
 */
//TODO

// ------By Business--------------

/** USER - GET
 *  Returns and displays all parts/bikes of a given provider.
 *  defaults to bikes.
 */
router.get(`/display:type-:business`, async (req, res) => {
    try{
        var result;
        switch (req.params.type.toUpperCase()) {
            case "PARTS":
            case "PART":    
                result = await Part.BikeParts.find({provider: req.params.business});
                break;
            case "BIKES":
            case "BIKE":
            default:        
                result = await Bike.Bikes.find({provider: req.params.business});
        }
        res.status(200).json(result);    //returns all found parts

    } catch(err){
        console.log(`> failed: ${err}`);
        res.status(500).json(`{message: failed at retrieval}`);
    }
});

/**
 * SUPPLIER - GET
 * Returns the given supplier and their catalogue.
 * Returns all suppliers + catalogues if none is specified.
 */
router.get(`/catalogue(-:supplier)?`, async (req, res) => {
    try{
        var result;
        console.log(`> param: ${req.params.supplier}`);
        console.log(`> retrieving catalogues for ${(req.params.supplier != null) ? req.params.supplier : 'all suppliers'}.`);
        
        if(req.params.supplier != null){ result = await Supplier.Suppliers.find( {name: req.params.supplier} ); }
        else{ result = await Supplier.Suppliers.find(); }
        res.status(200).json(result);    //returns all found suppliers

    } catch(err){
        console.log(`> failed: ${err}`);
        res.status(500).json(`{message: failed at retrieval. Supplier may not exist.}`);
    }
});

//helper method adds supplier TO BE REMOVED
router.post(`/addboi`, async (req, res) => {
    const new_supp = new Supplier.Suppliers({
        //business attributes
        name: "mock",
        phone: "1-800-999-9999",
        location: "canada probably",
        //supplier attributes
        description: "mockSupplier",
        catalogue: [
            {
                internalId: "part1",
                availableUnits: 5
            },
            {
                internalId: "part2",
                availableUnits: 56
            }
        ]
    });

    console.log(new_supp);
    try{
        const saved_supp = await new_supp.save();
        res.json(`{message: added mock supplier to DB}`);
        console.log('> added part successfully.');
    } catch(err) {
        console.log(`> failed: ${err}`);
        res.status(400).json({message: err});           // return error
        console.log('> supp not added.');
    }
});


// -------------------------------
module.exports = router;