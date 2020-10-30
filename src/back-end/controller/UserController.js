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
    let newNum = await dbRead.findPhoneNum(req.body.phoneNum);
    if (newNum !== null) {
        res.status(400).send('This phone number already exists.');
    } else {
        res.sendStatus(200);
    }
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

exports.user_send_new_password_recovery_email = function(req, res) {
    res.send('NOT IMPLEMENETED');
};

exports.user_send_new_email_confirmation_email = function(req, res) {
    res.send('NOT IMPLEMENETED');
};

exports.user_send_new_phonenumber_confirmation_sms = function(req, res) {
    res.send('NOT IMPLEMENETED');
};