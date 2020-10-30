const DatabaseDelete = require('../model/DatabaseDelete');
const DatabaseUpdate = require('../model/DatabaseUpdate.js');
const dbDelete = new DatabaseDelete();
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

exports.profile_tracker_get = function(req, res) {
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
        if (result.matchedCount) {
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
        if (result.matchedCount) {
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
        let result = dbUpdate.updateMessage(req.session.passport, 'ACS', req.body.ACS);
        if (result.matchedCount) {
            res.sendStatus(200); // OK
        } else {
            res.status(500).send('WRITE FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED');
    }
};

exports.profile_update_picks_put = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.profile_update_tracker_put = function(req, res) {
    if (req.user) {
        // user is authenticated
        let result = dbUpdate.addUserToTracker(req.session.passport, req.body.username);
        if (result.matchedCount) {
            res.sendStatus(200); // OK
        } else {
            res.status(500).send('WRITE FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED'); // Unauthorized (not logged in)
    }
};

exports.profile_del = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.profile_tracker_del = function(req, res) {
    if (req.user) {
        // user is authenticated
        let result = dbDelete.removeUserFromTracker(req.session.passport, req.body.username);
        if (result.matchedCount) {
            res.sendStatus(200); // OK
        } else {
            res.status(500).send('WRITE FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED'); // Unauthorized (not logged in)
    }
};