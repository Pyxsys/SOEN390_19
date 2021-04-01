/** AccountingRoutes.js
* Route controller for accounting information.
* 
* File controls + calls the uses and functions of assemblers.
*/

const express = require('express');
const router = express.Router();
const Sale = require('../../Models/Sales.js');

// Routes-------------------------
// ------Accounting----------------

/** PART - GET
 *  Returns and displays all accounting information: saleID, bike name, number of bikes, total revenue
 */

 router.get('/' , async (req, res) => {
    try{
        const sales = await Sale.Sales.find();
        res.json(sales);    //returns all found sales
    } catch(err){
        console.log(`> failed: ${err}`);
        res.status(500).json(`{message: failed at retrieval}`);
    }
});

