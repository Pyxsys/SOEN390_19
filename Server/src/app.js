const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const cors = require('cors');
//import seed function.
const seed = require('./seed');

// Gen and set app instance
const app = express();
const PORT = process.env.PORT || 5000;  //Get open port (default to 5000)

// Global Middlewares
app.use(body_parser.json());    // body-parser runs whenever a request is made
app.use(cors());

// Import Routes
const userRoute = require('./Routes/Api/UserRoutes.js');    // Define target user route
app.use('/users', userRoute);                               // Enforce use of route on specified route

const inventoryRoute = require ('./Routes/Api/InventoryRoutes.js'); // Define inventory route
app.use('/inventory', inventoryRoute);

const ManufacturingRoute = require('./Routes/Api/ManufacturingRoutes.js'); // Define manufacturing route
app.use('/manufacturing', ManufacturingRoute);


// Connect to mongoose mongoDB
///* Uncomment for local host mongodb connection
//var db_link = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'; //TODO COMMENT
//*/
var db_link = 'mongodb://mongo:27017/kapp-docker-express';    //docker mongo container link

mongoose.connect(
    db_link,                                    // Target DB
    {   // Removes deprecation warnings
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true
    },     
     () => console.log(`... Connected to DB on ${db_link}`)  // Log message
);

// Begin listening / Start server
app.listen(PORT, () => console.log(`... Server started on port ${PORT}.`));
seed.seedDB();  //Seed DB with contents