/** UserRoutes.js
* Route controller for user models.
* 
* File supports Creating, Reading, and Updating of
* user models.
*/
const express = require('express');
const router = express.Router();
const User = require('../../Models/User');

/* LINKED ROOT: /users */

// Routes-------------------------

/** GET
 *  Returns and displays all users.
 */
router.get('/', async (req, res) => {
    try{
        const users = await User.Users.find({},'username email');   //returns only usernames + emails of users form db
        res.json(users);    //returns all found users
    } catch(err){
        console.log(`> failed: ${err}`);
        res.status(500).json(`{message: failed at retrieval}`);
    }
});


/** GET - by email w/ password
 *  Returns a specific user by email w/ password.
 *  Used for login.
 */
router.get('/login/:email/:pass', async (req, res) => {
    /* TODO For aquiring data from body
    replace "req.params.pass" with "req.body.password"
    and change route to only include /login/:email?
    */

    try{
        var success = 0;
        const users = await User.Users.findOne({email: req.params.email});
//DEBUG        console.log(users);

        if(users != null){  //check if email is found in DB
            //confirm matching passwords
            if(User.isPasswordCorrect(
                users.password, 
                users.salt, 
                users.iterations, 
                req.params.pass
            )){ 
                console.log(`> User '${users.username.toString()}' authenticated.`);
                success++;  
            }
        }
        
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
        console.log(`> failed: ${err}`);
        console.log(err); //DEBUG
        res.status(500).json('error occured');
    }
});

/** POST
 *  Adds user to DB
 * */
router.post('/', async (req, res) => {
//DEBUG  console.log('> request body:');
//DEBUG  console.log(req.body);  

    var hashed_password = User.hashPassword(req.body.password);

    // Create new user instance with req data + hash
    const user = new User.Users({
        username:   req.body.username,
        email:      req.body.email,
        password:   hashed_password.hash,
        salt:       hashed_password.salt,
        iterations: hashed_password.iterations
    });

    console.log(user);

    // Save new user instance to db
    try{
        const saved_user = await user.save();
        res.json(`{message: added user '${saved_user.username}' to DB}`);
        console.log('> user added successfully.');
    } catch(err) {
        console.log(`> failed: ${err}`);
        res.json({message: err}); // return error
        console.log('> user not added.');
    }

});

/** PATCH
 *  update a user
 */
router.patch('/:userId', async (req, res) => {
    try{
        var hashed_password = User.hashPassword(req.body.password); //rehashes the password
        const updated_user = await User.Users.updateOne(
            { _id: req.params.userId },
            { $set : {
                username:   req.body.username,
                email:      req.body.email,
                password:   hashed_password.hash,
                salt:       hashed_password.salt,
                iterations: hashed_password.iterations
            }}
        );
        res.json(`{message: updated user in DB}`); // returns message about updated user

    }catch(err){
        res.status(400).json(`{message: user could not be found or bad request}`); // return error
        console.log(`> failed: ${err}`);
        console.log(`> user: ${req.params.userId} could not be updated.`);
    }
});

/** DELETE
 *  deletes a specific user * 
 */
router.delete('/:userId', async (req, res) => {
    try{
        const removed_user = await User.Users.deleteOne({ _id: req.params.userId });
        res.json(removed_user); // returns the removed user
    }catch(err){
        res.json(`{message: error occured when deleting user, task could not be completed}`); // return error
        console.log(`> failed: ${err}`);
        console.log(`> user: ${req.params.userId} could not be deleted.`);
    }

    
});
 // -------------------------------

module.exports = router;