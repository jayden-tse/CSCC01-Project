const DatabaseDelete = require('../model/DatabaseDelete');
const DatabaseUpdate = require('../model/DatabaseUpdate');
const DatabaseRead = require('../model/DatabaseRead');
const dbDelete = new DatabaseDelete();
const dbUpdate = new DatabaseUpdate();
const dbRead = new DatabaseRead();

exports.profile_picks_get = async function(req, res) {
    if (req.user) {
        // user is authenticated
        let result = await dbRead.getPickHistory(req.session.passport);
        if (result) {
            res.status(200).send(result); // OK
        } else {
            res.status(500).send('GET FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED'); // Unauthorized (not logged in)
    }
};

exports.profile_tracker_get = async function(req, res) {
    if (req.user) {
        // user is authenticated
        let result = await dbRead.getTracker(req.session.passport);
        if (result) {
            res.status(200).send(result); // OK
        } else {
            res.status(500).send('GET FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED'); // Unauthorized (not logged in)
    }
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

exports.profile_update_status_put = async function(req, res) {
    if (req.user) {
        // user is authenticated
        let result = await dbUpdate.updateMessage(req.session.passport, 'status', req.body.status);
        if (result.matchedCount) {
            res.sendStatus(200); // OK
        } else {
            res.status(500).send('WRITE FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED'); // Unauthorized (not logged in)
    }
};

exports.profile_update_ACS_put = async function(req, res) {
    if (req.user) {
        // user is authenticated
        let result = await dbUpdate.updateMessage(req.session.passport, 'ACS', req.body.ACS);
        if (result.matchedCount) {
            res.sendStatus(200); // OK
        } else {
            res.status(500).send('WRITE FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED');
    }
};

exports.profile_update_picks_put = async function(req, res) {
    if (req.user) {
        // user is authenticated
        let result = await dbUpdate.addMatchToHistory(req.session.passport, req.body.match);
        if (result.matchedCount) {
            res.sendStatus(200); // OK
        } else {
            res.status(500).send('WRITE FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED'); // Unauthorized (not logged in)
    }
};

exports.profile_update_tracker_put = async function(req, res) {
    if (req.user) {
        // user is authenticated
        let result = await dbUpdate.addUserToTracker(req.session.passport, req.body.username);
        if (result.matchedCount) {
            res.sendStatus(200); // OK
        } else {
            res.status(500).send('WRITE FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED'); // Unauthorized (not logged in)
    }
};

exports.profile_tracker_del = async function(req, res) {
    if (req.user) {
        // user is authenticated
        let result = await dbDelete.removeUserFromTracker(req.session.passport, req.body.username);
        if (result.matchedCount) {
            res.sendStatus(200); // OK
        } else {
            res.status(500).send('WRITE FAILED'); // Internal server error
        }
    } else {
        res.status(401).send('NOT AUTHENTICATED'); // Unauthorized (not logged in)
    }
};