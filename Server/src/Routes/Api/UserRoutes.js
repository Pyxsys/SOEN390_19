const express = require('express');
const router = express.Router();
const User = require('../../Models/User');

/* LINKED ROOT: /users */

// Routes-------------------------

/** GET
 *  Returns and displays all users 
 */
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(err){
        res.json({message: err});
    }
});


/** GET - by email w/ password
 *  Returns a specific user by email w/ password
 */
router.get('/login/:email/:pass', async (req, res) => {
    try{
        var success = 0;
        const users = await User.findOne({email: req.params.email});
        
        if(users != null){  //check if email is found in DB
            //confirm matching passwords
            if(req.params.pass === users.password){ 
                console.log(`User '${users.username.toString()}' authenticated.`);
                success++;  
        }}
        
        //response based on success of authentication
        if(success > 0) { 
            res.status(202).json({
                message: 'authenitcated valid credentials'
            }); 
        } else {
            res.status(400).json({
                message: 'invalid credentials - bad request'
            }); 
        }

    } catch(err){
        console.log(err);
        res.status(500).json('error occured');
    }
});

/** POST
 *  Adds user to DB
 * */
router.post('/', async (req, res) => {
    console.log('> request body:');
    console.log(req.body);

    // Create new user isntance qwith req data
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    // Save new user instance to db
    try{
        const saved_user = await user.save();
        res.json(saved_user);
        console.log('> user added successfully.');
    } catch(err) {
        console.log(err)
        res.json({message: err}); // return error
        console.log('> user not added.');
    }

});

/** PATCH
 *  update a user
 */
router.patch('/:userId', async (req, res) => {
    try{
        const updated_user = await User.updateOne(
            { _id: req.params.userId },
            { $set : {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            }}
            );
        res.json(updated_user); // returns the updated user

    }catch(err){
        res.json({message: err}); // return error
        console.log(`> user: ${req.params.userId} could not be updated.`);
    }
});

/** DELETE
 *  deletes a specific user * 
 */
router.delete('/:userId', async (req, res) => {
    try{
        const removed_user = await User.deleteOne({ _id: req.params.userId });
        res.json(removed_user); // returns the removed user
    }catch(err){
        res.json({message: err}); // return error
        console.log(`> user: ${req.params.userId} could not be deleted.`);
    }

    
});
 // -------------------------------

module.exports = router;