const DatabaseUpdate = require('../model/DatabaseUpdate.js');
const dbUpdate = new DatabaseUpdate();

exports.profile_put = function(req, res) {
    if (req.user) {
        // user is authenticated

    } else {
        res.send('NOT AUTHORIZED');
    }
};

exports.profile_get = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.profile_picks_get = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.profile_update_picture_put = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.profile_update_about_put = async function(req, res) {
    if (req.user) {
        // user is authenticated
        console.log(req.session.passport);
        let result = await dbUpdate.updateMessage(req.session.passport, 'about', req.body.about);
        if (result) {
            res.sendStatus(200); // OK
        } else {
            res.status(500).send('WRITE FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED'); // Unauthorized (not logged in)
    }
};

exports.profile_update_status_put = function(req, res) {
    if (req.user) {
        // user is authenticated
        let result = dbUpdate.updateMessage(req.session.passport, 'status', req.body.status);
        if (result) {
            res.sendStatus(200); // OK
        } else {
            res.status(500).send('WRITE FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED'); // Unauthorized (not logged in)
    }
};

exports.profile_update_ACS_put = function(req, res) {
    if (req.user) {
        // user is authenticated
        let result = dbUpdate.updateMessage(req.session.passport, 'ACS', req.body.status);
        if (result) {
            res.sendStatus(200); // OK
        } else {
            res.status(500).send('WRITE FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED');
    }
};

exports.profile_del = function(req, res) {
    res.send('NOT IMPLEMENTED');
};