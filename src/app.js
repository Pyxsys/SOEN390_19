const express = require('express');
const mongoose = require('mongoose');

// Gen and set app instance
const app = express();
const PORT = process.env.PORT || 5000;  //Get open port (default to 5000)

// Import Routes
const userRoute = require('./Routes/Api/UserRoutes');   // Define targer route
app.use('/users', userRoute);                           // Enforce use of route on specified route




// Connect to mongoose mongoDB
var db_link = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
mongoose.connect(
    db_link,                                    // Target DB
    { useNewUrlParser: true },                  // Removes deprecation warning
     () => console.log('... Connected to DB.')  // Log message
);

// Begin listening / Start server
app.listen(PORT, () => console.log(`... Server started on port ${PORT}.`));