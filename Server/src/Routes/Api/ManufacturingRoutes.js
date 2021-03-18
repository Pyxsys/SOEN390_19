  
/** ManufacturingRoutes.js
* Route controller for bike assembly.
* 
* File controls + calls the uses and functions of assemblers.
*/
const express = require('express');
const router = express.Router();
const Assemblers = require('../../Models/Assembler');

/** ASSEMBLY - POST
 *  Assembles a bike
 * */
 router.post('/assemble', async (req, res) => {
    try{
        let result = Assemblers.assembleBike(req.body.internalId, req.body.quantity);   //call assemble function
        res.status(200).json({
                message: `Created ${result} ${req.body.internalId} bike(s).`,
                amount: result
            });
    }catch(err) {
        console.log(`> failed: ${err}`);
        res.status(400).json({message: `${err}`});           // return error
    }
    
});

module.exports = router;