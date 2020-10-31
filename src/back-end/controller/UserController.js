const DatabaseCreate = require('../model/DatabaseCreate.js');
const DatabaseRead = require('../model/DatabaseRead');
const DatabaseUpdate = require('../model/DatabaseUpdate');
const dbCreate = new DatabaseCreate();
const dbRead = new DatabaseRead();
const dbUpdate = new DatabaseUpdate();

exports.user_check_username_get = async function(req, res) {
    let newUsername = await dbRead.findUsername(req.body.username);
    if (newUsername !== null) {
        res.status(400).send('This username already exists.');
    } else {
        res.sendStatus(200);
    }
};

exports.user_check_email_get = async function(req, res) {
    let newEmail = await dbRead.findEmail(req.body.email);
    if (newEmail !== null) {
        res.status(400).send('This email already exists.');
    } else {
        res.sendStatus(200);
    }
};

exports.user_check_phonenum_get = async function(req, res) {
    let newNum = await dbRead.findPhoneNum(req.body.phonenum);
    if (newNum !== null) {
        res.status(400).send('This phone number already exists.');
    } else {
        res.sendStatus(200);
    }
};

exports.user_update_password_put = async function(req, res) {
    if (req.user) {
        // user is authenticated
        let hashedPassword = dbCreate.passwordHasher(req.body.password);
        let result = await dbUpdate.updateUser(req.session.passport, 'password', hashedPassword);
        if (result.matchedCount) {
            res.sendStatus(200); // OK
        } else {
            res.status(500).send('WRITE FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED'); // Unauthorized (not logged in)
    }
};

exports.user_update_email_put = async function(req, res) {
    if (req.user) {
        // user is authenticated
        let newEmail = await dbRead.findEmail(req.body.email);
        if (newEmail === null) {
            let result = await dbUpdate.updateUser(req.session.passport, 'email', req.body.email);
            if (result.matchedCount) {
                res.sendStatus(200); // OK
            } else {
                res.status(500).send('WRITE FAILED'); // Internal server error
            }
        } else {
            res.status(400).send('Email address already exists.');
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED'); // Unauthorized (not logged in)
    }
};

exports.user_update_phonenum_put = async function(req, res) {
    if (req.user) {
        // user is authenticated
        let newNum = await dbRead.findPhoneNum(req.body.phonenum);
        if (newNum === null) {
            let result = await dbUpdate.updateUser(req.session.passport, 'phonenum', req.body.phonenum);
            if (result.matchedCount) {
                res.sendStatus(200); // OK
            } else {
                res.status(500).send('WRITE FAILED'); // Internal server error
            }
        } else {
            res.status(400).send('Phone number already exists.');
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED'); // Unauthorized (not logged in)
    }
};

exports.user_send_new_password_recovery_email = async function(req, res) {
    res.send('NOT IMPLEMENETED');
};

exports.user_send_new_email_confirmation_email = async function(req, res) {
    res.send('NOT IMPLEMENETED');
};

exports.user_send_new_phonenum_confirmation_sms = async function(req, res) {
    res.send('NOT IMPLEMENETED');
};