const DatabaseCreate = require('../model/DatabaseCreate.js');
const dbCreate = new DatabaseCreate();
const User = require('../model/User.js');
// const DatabaseRead = require('../model/DatabaseRead.js');
// const DatabaseUpdate = require('../model/DatabaseUpdate.js');
// const DatabaseDelete = require('../model/DatabaseDelete.js');

exports.user_put = function(req, res) {
    // Get user data from the input, but don't create the actual User yet.
    let questionnaireAnswers = {
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3,
        q4: req.body.q4,
        q5: req.body.q5
    }
    let user = new User(req.body.username, req.body.password, req.body.email, req.body.phoneNum, null);

    // Pass this data into DatabaseCreate where it will be created into a new User and Store the user .
    let hashedUser = dbCreate.createUser(user, questionnaireAnswers); // This is our User

    // Store the user into the database.
    dbCreate.storeUser(hashedUser);
    console.log("sending");
    res.sendStatus(200);
};

exports.user_get = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.user_update_password_put = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.user_update_email_put = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.user_update_phone_number_put = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.user_del = function(req, res) {
    res.send('NOT IMPLEMENTED');
};