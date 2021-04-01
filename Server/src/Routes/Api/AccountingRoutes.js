/** AccountingRoutes.js
* Route controller for accounting information.
* 
* File controls + calls the uses and functions of assemblers.
*/

const express = require('express');
const router = express.Router();
//const Sale = require('../../Models/Sales.js');
const Bike = require('../../Models/Bike.js');

// Routes-------------------------
// ------Accounting----------------

/** PART - GET
 *  Returns and displays all accounting information: saleID, bike name, number of bikes, total revenue
 */

 router.get('/' , async (req, res) => {
    try{
        const sales = await Bike.Bikes.find(); // change to const sales = await Sale.Sales.find() once sales model is complete
        res.json(sales);    //returns all found sales
    } catch(err){
        console.log(`> failed: ${err}`);
        res.status(500).json(`{message: failed at retrieval}`);
    }
});

module.exports = router;