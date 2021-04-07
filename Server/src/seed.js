/** seed.js
* Seed file for populating DB on startup.
* 
* File exists to seed database with values to allow
* the use of certain features from the get-go. Also instantiates 
* the admin login credentials.
*/
const express = require('express');
const router = express.Router();

//Models
const User = require('./Models/User');
const Part = require('./Models/BikePart');
const Bike = require('./Models/Bike');
const Supplier = require('./Models/Supplier');

//Document Definintions
//users
const hashed_password = User.hashPassword("administrator");
const admin_user =
        {
            username:       "admin",
            email:          "admin@email.com",
            password:       hashed_password.hash,
            salt:           hashed_password.salt,
            iterations:     hashed_password.iterations
        };
        
        
//Bike Parts
const part001 = 
{
    internalId: "seed-JBH01", 
    partType: "Handle Bars", 
    price: 30, 
    numberOfUnits: 400, 
    provider: "seed-James Bars", 
    partDocPath: "N/A", 
    partDocStep: "N/A"
},
part002 = {
    internalId: "seed-JBH02", 
    partType: "Handle Bars",
    price: 20, 
    numberOfUnits: 250, 
    provider: "seed-James Bars", 
    partDocPath: "N/A", 
    partDocStep: "N/A"
};

//Bikes
const bike001 =
{
    internalId:       "seed-BXSP01",
    type:             "Speed",   
    price:            450,
    numberOfUnits:    200,
    provider:         "Bixe",
    bikeDocPath:      "N/A",   
    partsList: [
        {partInternalId: "seed-JBH01"}, 
        {partInternalId: "seed-JBH02"}
    ]
    
};

//Suppliers
const supplier001 = 
{
    //business attributes
    name: "seed-James Bar",
    phone: "1-800-999-9999",
    location: "Soemhwa, Canada",
    //supplier attributes
    description: "Premium handlebars from guys with handlebars.",
    catalogue: [
        {
            internalId: "seed-JBH01",
            availableUnits: 5
        },
        {
            internalId: "seed-JBH01",
            availableUnits: 56
        }
    ]
};

//Seed DB with the outlined values.
function seedDB(){
    console.log("... Seeding Database");

    const options = { 
        upsert: true, 
        new: true, 
        useFindAndModify: false     //appease mongoose dep-warnings
    }   

    //Add admin_user
    try{
        User.Users.findOneAndUpdate( 
            { username: admin_user.username }, 
            { $set: admin_user }, 
            options, 
            function(err, res) {}
            );
        console.log('   ... Seed admin_user added.');
    } catch(err) {
        console.log(`   > failed: ${err}`);
        console.log('   > Seed admin_user not added.');
    }

    //Add Parts
    try{
        Part.BikeParts.findOneAndUpdate( 
            { internalId: part001.internalId }, { $set: part001 }, 
            options, function(err, res) {}
        );

        Part.BikeParts.findOneAndUpdate( 
            { internalId: part002.internalId }, { $set: part002 }, 
            options, function(err, res) {}
        );

        console.log('   ... Seed parts added.');
    } catch(err) {
        console.log(`   > failed: ${err}`);
        console.log('   > Seed parts not added.');
    }

    //Add Bikes
    try{
        Bike.Bikes.findOneAndUpdate( 
            { internalId: bike001.internalId }, { $set: bike001 }, 
            options, function(err, res) {}
        );

        console.log('   ... Seed bikes added.');
    } catch(err) {
        console.log(`   > failed: ${err}`);
        console.log('   > Seed bikes not added.');
    }

    try{
        Supplier.Suppliers.findOneAndUpdate( 
            { name: supplier001.name }, { $set: supplier001 }, 
            options, function(err, res) {}
        );

        console.log('   ... Seed supplier added.');
    } catch(err) {
        console.log(`   > failed: ${err}`);
        console.log('   > Seed supplier not added.');
    }
}

module.exports.seedDB = seedDB;
