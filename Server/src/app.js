//Declare imports and requirements
const express = require('express');
const mongoose = require('mongoose');

const body_parser = require('body-parser');
const cors = require('cors');

const logger = require('./Middleware/Logger')
const seed = require('./seed');

// Gen and set app instance
const app = express();
const PORT = process.env.PORT || 5000;  //Get open port (default to 5000)

// Global Middlewares
app.use(body_parser.json());    // body-parser runs whenever a request is made
app.use(cors());
app.use(logger());              // logger will record the requests made to back-end


// Import Routes
const userRoute = require('./Routes/Api/UserRoutes.js');    // Define target user route
app.use('/users', userRoute);                               // Enforce use of route on specified route

const inventoryRoute = require ('./Routes/Api/InventoryRoutes.js'); // Define inventory route
app.use('/inventory', inventoryRoute);


// Connect to mongoose mongoDB
///* Uncomment for local host mongodb connection
//var db_link = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'; //TODO COMMENT
//*/
var db_link = 'mongodb://mongo:27017/kapp-docker-express';    //docker mongo container link

mongoose.connect(
    db_link,                                    // Target DB
    { useNewUrlParser: true },                  // Removes deprecation warning
     () => console.log(`... Connected to DB on ${db_link}`)  // Log message
);

// Begin listening / Start server
app.listen(PORT, () => console.log(`... Server started on port ${PORT}.`));
seed.seedDB();  //Seed DB with contents