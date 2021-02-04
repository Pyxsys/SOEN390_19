const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const cors = require('cors')

// Gen and set app instance
const app = express();
const PORT = process.env.PORT || 5000;  //Get open port (default to 5000)

// Global Middlewares
app.use(body_parser.json());    // body-parser runs whenever a request is made
app.use(cors())
// Import Routes
const userRoute = require('./Routes/Api/UserRoutes');   // Define targer route
app.use('/users', userRoute);                           // Enforce use of route on specified route




// Connect to mongoose mongoDB
/* Uncomment for local host mongodb connection
var db_link = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
//*/
var db_link = 'mongodb://mongo:27017/kapp-docker-express-mongo';    //docker mongo container link
mongoose.connect(
    db_link,                                    // Target DB
    { useNewUrlParser: true },                  // Removes deprecation warning
     () => console.log('... Connected to DB.')  // Log message
);

// Begin listening / Start server
app.listen(PORT, () => console.log(`... Server started on port ${PORT}.`));