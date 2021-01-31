const express = require('express');
const router = express.Router();
const User = require('../../Models/User');

/* LINKED ROOT: /users */

//Routes
router.get('/', (req, res) => {
    res.send("User page");
});

router.post('/', (req, res) => {
    console.log(req.body);
});

module.exports = router;