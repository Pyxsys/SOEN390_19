/**
 * User model includes username, email address, password, salt, and iterations.
 * Contains a function to hash the password and to check if the entered password is correct
 */

const mongoose = require('mongoose');
const crypto = require('crypto');

// Schema
const user_schema = mongoose.Schema({
    username:       {type: String, required: true},
    email:          {type: String, required: true},
    password:       {type: String, required: true},
    salt:           {type: String, required: true},
    iterations:     {type: Number, required: true}
});

//Generate a random salt and hashes the password and the salt to encypt them
function hashPassword(password) {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000; //TODO: could randomize
    var hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: hash,
        iterations: iterations
    };
}

//Compares the attempt with a given hash and its salt
function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
    return savedHash == crypto.pbkdf2Sync(passwordAttempt, savedSalt, savedIterations, 64, 'sha512').toString('hex');
}

module.exports.Users = mongoose.model('Users', user_schema);
module.exports.hashPassword = hashPassword;
module.exports.isPasswordCorrect = isPasswordCorrect;