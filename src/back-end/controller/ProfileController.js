const DatabaseDelete = require('../model/DatabaseDelete');
const DatabaseUpdate = require('../model/DatabaseUpdate');
const DatabaseRead = require('../model/DatabaseRead');
const { WRITE_FAILED, NOT_AUTHENTICATED } = require('./StatusMessages');
const dbDelete = new DatabaseDelete();
const dbUpdate = new DatabaseUpdate();
const dbRead = new DatabaseRead();

exports.profile_get = async function (req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbRead.getProfile(req.session.passport);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_picks_get = async function (req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbRead.getPickHistory(req.session.passport);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_tracker_get = async function (req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbRead.getTracker(req.session.passport);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_update_picture_put = function (req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.profile_get_picture = async function (req, res) {
    if (req.user) {
        try {
            let url = await dbRead.getProfilePicture(req.session.passport);
            res.status(200).json({ picture: url }); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }

}

exports.profile_links_get = async function (req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbRead.getLinks(req.session.passport);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
}

exports.profile_update_about_put = async function (req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbUpdate.updateMessage(req.session.passport, 'about', req.body.about);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_update_status_put = async function (req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbUpdate.updateMessage(req.session.passport, 'status', req.body.status);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_update_ACS_put = async function (req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbUpdate.updateMessage(req.session.passport, 'ACS', req.body.ACS);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};

exports.profile_update_picture_put = async function (req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbUpdate.updateMessage(req.session.passport, 'picture', req.body.picture);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};

exports.profile_update_picks_put = async function (req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbUpdate.addMatchToHistory(req.session.passport, req.body.match);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_update_tracker_put = async function (req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbUpdate.addUserToTracker(req.session.passport, req.body.username);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_update_links_facebook_put = async function(req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbUpdate.addSocialMediaLink(req.session.passport, 'facebook', req.body.links);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_update_links_instagram_put = async function(req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbUpdate.addSocialMediaLink(req.session.passport, 'instagram', req.body.links);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_update_links_twitter_put = async function(req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbUpdate.addSocialMediaLink(req.session.passport, 'twitter', req.body.links);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.profile_tracker_del = async function(req, res) {
    if (req.user) {
        // user is authenticated
        try {
            await dbDelete.removeUserFromTracker(req.session.passport, req.body.username);
            res.sendStatus(200); // OK
        } catch {
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};