const DatabaseCreate = require('../model/DatabaseCreate.js');
const DatabaseRead = require('../model/DatabaseRead.js');
const dbCreate = new DatabaseCreate();
const dbRead = new DatabaseRead();
const User = require('../model/User.js');
// const DatabaseUpdate = require('../model/DatabaseUpdate.js');
// const DatabaseDelete = require('../model/DatabaseDelete.js');

exports.user_put = async function(req, res) {
    // Get user data from the input, but don't create the actual User yet.
    let questionnaireAnswers = {
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3,
        q4: req.body.q4,
        q5: req.body.q5
    }

    // 1st line is for backend testing ONLY, swap comment to test for backend and uncomment passwordHasher.
    // let user = new User(req.body.username, dbCreate.passwordHasher(req.body.password), req.body.email, req.body.phoneNum, null);
    let user = new User(req.body.username, req.body.password, req.body.email, req.body.phoneNum, null);
    let newUsername = await dbRead.findUsername(user.username);
    let newEmail = await dbRead.findEmail(user.email);
    let newNum = await dbRead.findPhoneNum(user.phoneNum);
    console.log(newUsername + " " + newNum + " " + newEmail)
    if (newUsername != null) {
        res.status(400).send('This username already exists.');
    } else if (newEmail != null) {
        res.status(400).send('This email address already exists.');
    } else if (newNum != null) {
        res.status(400).send('This phone number already exists.');
    } else {
        // Pass this data into DatabaseCreate where it will be created into a new User and Store the user.
        try {
            await dbCreate.createUser(user, questionnaireAnswers);
            res.sendStatus(200);
        } catch {
            res.status(500).send('WRITE FAILED');
        }
    }
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