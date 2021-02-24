/** File exists to seed database with values to allow
 *  the use of certain features from the get-go.
 */
const express = require('express');
const router = express.Router();

//Models
const User = require('./Models/User');
const Part = require('./Models/BikePart');
const Bike = require('./Models/Bike');
const Supplier = require('./Models/Supplier');

//models definintion
const hashed_password = User.hashPassword("administrator");
const adminUser =
        {
            username:       "admin",
            email:          "admin@email.com",
            password:       hashed_password.hash,
            salt:           hashed_password.salt,
            iterations:     hashed_password.iterations
        }

//Seed DB with the outlined values.
function seedDB(){
    console.log("...Seeding Database");

    const options = { 
        upsert: true, 
        new: true, 
        useFindAndModify: false     //appease mongoose dep-warnings
    }   

    // 
    try{
        User.Users.findOneAndUpdate( 
            { username: adminUser.username }, 
            { $set: adminUser }, 
            options, 
            function(err, res) {}
            );
        console.log('> user added successfully.');
    } catch(err) {
        console.log(`> failed: ${err}`);
        console.log('> user not added.');
    }
}

module.exports.seedDB = seedDB;