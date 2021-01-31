const express = require('express');

//gen and set app instnace
const app = express();
const PORT = process.env.PORT || 5000;


//begin listening
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));