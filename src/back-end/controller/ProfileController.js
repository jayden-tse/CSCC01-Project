const DatabaseUpdate = require('../model/DatabaseUpdate');
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

exports.profile_update_about_put = function(req, res) {
    if (req.user) {
        // user is authenticated
        let result = dbUpdate.updateMessage(req.user, 'about', req.body.about);
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
        let result = dbUpdate.updateMessage(req.user, 'status', req.body.status);
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
        let result = dbUpdate.updateMessage(req.user, 'ACS', req.body.status);
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