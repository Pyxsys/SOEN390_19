/** AccountingRoutes.js
* Route controller for accounting information.
* 
* File controls + calls the uses and functions of assemblers.
*/

const express = require('express');
const router = express.Router();

const Accounting = require('../../Models/Accounting');
const Bike = require('../../Models/Bike.js');

// Routes-------------------------
// ------Accounting----------------

/** Accounting - GET
 *  Returns and displays all accounting information: saleID, bike name, number of bikes, total revenue
 */

 router.get('/' , async (req, res) => {
    try{
        const sales = await Accounting.Accounting.find(); // change to const sales = await Sale.Sales.find(); once sales model is complete
        res.json(sales);    //returns all found sales
    } catch(err){
        console.log(`> failed: ${err}`);
        res.status(500).json(`{message: failed at retrieval}`);
    }
});

/** Accounting - Post
 *  Adds accounting information to DB
 */

 router.post('/post', async (req, res) => {
 

    // Create new accounting instance
    const new_accounting = new Accounting.Accounting({
        internalId:       req.body.internalId, //Distinct from mongoDB ID, given by industry standard
        item:         req.body.item,   
        price:            req.body.price,
        numberOfUnits:    req.body.numberOfUnits,
        client:         req.body.client
    });
    
    console.log(new_accounting);
    
    // Save new accounting instance to db
    try{
        const saved_part = await new_accounting.save();
        res.json(`{message: added part '${saved_part.internalId}' to DB}`);
        console.log('> added part successfully.');
    } catch(err) {
        console.log(`> failed: ${err}`);
        res.status(400).json({message: err});           // return error
        console.log('> part not added.');
    }
});

module.exports = router;