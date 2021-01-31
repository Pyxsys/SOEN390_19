const express = require('express');

const config = {
    views: 'Views',                         //Sets views directory
    db: {
        url: 'mongo://localhost/BikeErpDB', //Connect to local database "BikeErpDB"
        type: 'mongo',
        onError: (err) => {
            console.log('Error: DB connection failed.')
        }
    }
}

//gen and set app instnace
const app = express(config);
const PORT = process.env.PORT || 5000;  //Get open port (default to 5000)


//begin listening
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));