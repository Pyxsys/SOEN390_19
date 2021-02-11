const express = require('express');
const router = express.Router();
const Sale = require('../../Models/Sale');

/** GET
 *  Returns and displays all sales
 */

router.get('/', async (req, res) => {
    try{
        const sales = await Sale.find();
        res.json(sales);
    } catch(err){
        res.json({message: err});
    }
});

module.exports = router;