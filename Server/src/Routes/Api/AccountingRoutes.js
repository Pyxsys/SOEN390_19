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
 *  Checks for if bike already exist are done on Front-End
 */
 router.post('/', async (req, res) => {
    try{
        //compute new bike amount
        const bike_model = await Bike.Bikes.findOne({ internalId: req.body.item });
        if(bike_model === null){ throw new Error(`Cannot find bike "${req.body.item}" in the inventory.`); }
        var inventory_amount = bike_model.numberOfUnits;
        inventory_amount -= req.body.numberOfUnits

        //Ensure values are not negative
        if(inventory_amount < 0 || req.body.numberOfUnits < 0){ throw new Error(`Cannot order a negative amount or more ${bike_model.internalId} than are in inventory.`); }

        //update bike inventory with new amount
        await Bike.Bikes.findOneAndUpdate(
            { internalId: bike_model.internalId }, 
            { $set: {numberOfUnits: inventory_amount} },
            { useFindAndModify: false }
        ).exec();

        //Gen random order ID
        const order_id = await genOrderID();
        
        // Create new accounting instance
        const new_accounting = new Accounting.Accounting({
            internalId:       order_id,
            item:             req.body.item, 
            price:            req.body.price,
            numberOfUnits:    req.body.numberOfUnits,
            client:           req.body.client
        });

        // Save new accounting instance to db
        const saved_account = await new_accounting.save();
        res.json(`{ message: "added transaction form: ${saved_account.internalId} to DB" }`);
        console.log("\x1b[32m%s\x1b[0m", `   ... Added order ${order_id} successfuly.`, "");

    } catch(err) {
        res.status(400).json({message: err});           // return error
        console.log("\x1b[31m%s\x1b[0m", `> Failed: ${err}`,"");
        console.log("\x1b[31m%s\x1b[0m", `> Form not added.`,"");
    }
});

/**
 * Creates a unique order id string for an accounting form based on the date
 * @returns A unique accounting order id string
 */
async function genOrderID(){
    //create speudo-random string from time
    let order_id = "ao" + Date.now();
    let unique = false;

    //start loop
    while(!unique){
        //ensure string doesnt exist
        let dupe = await Accounting.Accounting.findOne({ internalId: order_id });
        if(dupe === null){unique = true;}
        else{
            //change value
            let order_id = "ao" + Date.now();
        }
    }

    //return unique value
    return order_id;
}

module.exports = router;