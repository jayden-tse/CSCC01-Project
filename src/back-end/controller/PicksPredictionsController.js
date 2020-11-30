const DatabaseCreate = require('../model/DatabaseCreate');
const DatabaseDelete = require('../model/DatabaseDelete');
const DatabaseUpdate = require('../model/DatabaseUpdate');
const DatabaseRead = require('../model/DatabaseRead');
const { WRITE_FAILED, NOT_AUTHENTICATED, NOT_FOUND, MATCH_EXISTS, SEASON_EXISTS } = require('./StatusMessages');
const { DAILY, PLAYOFFS } = require('../model/DatabaseHelper');
const dbCreate = new DatabaseCreate();
const dbDelete = new DatabaseDelete();
const dbUpdate = new DatabaseUpdate();
const dbRead = new DatabaseRead();

exports.matches_daily_picks_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let match = await dbCreate.createMatch(DAILY, req.body.team1, req.body.team2, req.body.start, req.body.end, req.body.date);
            if (match !== null) {
                res.status(200).send(match); // OK
            } else {
                res.status(409).send(MATCH_EXISTS) // MATCH EXISTS
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_playoffs_picks_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let match = await dbCreate.createMatch(PLAYOFFS, req.body.team1, req.body.team2, req.body.start, req.body.end, req.body.date);
            if (match !== null) {
                res.status(200).send(match); // OK
            } else {
                res.status(409).send(MATCH_EXISTS) // MATCH EXISTS
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_preseason_user_picks_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let preseasonPicks = await dbCreate.createPreseasonObject(req.session.passport.user, req.body.preseasonPicks);
            res.status(200).send(preseasonPicks); // OK

        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_preseason_awards_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let preseasonAwards = await dbCreate.createPreseasonAwards(req.body.preseasonAwards);
            if (preseasonAwards !== null) {
                res.status(200).send(preseasonAwards); // OK
            } else {
                res.status(409).send(SEASON_EXISTS); // SEASON EXISTS
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_daily_picks_get = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let dailyPicks = await dbRead.getPicks(DAILY);
            res.status(200).send(dailyPicks); // OK
        } catch (e) {
            console.error(e);
            res.status(500).send(READ_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_playoffs_picks_get = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let playoffsPicks = await dbRead.getPicks(PLAYOFFS);
            res.status(200).send(playoffsPicks); // OK
        } catch (e) {
            console.error(e);
            res.status(500).send(READ_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_preseason_awards_get = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let preseasonAwards = await dbRead.getPreseasonAwards(req.query.SEASON);
            if (preseasonAwards !== null) {
                res.status(200).send(preseasonAwards); // OK
            } else {
                res.status(404).send(NOT_FOUND); // NOT FOUND
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_update_daily_picks_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let match = await dbUpdate.updateMatch(DAILY, req.body.matchid, req.body.team1, req.body.team2, req.body.start, req.body.end, req.body.date, req.body.picks);
            if (match) {
                res.status(200).send(match); // OK
            } else if (match === 0) {
                res.status(404).send(NOT_FOUND); //NOT FOUND
            } else {
                res.status(409).send(MATCH_EXISTS) // MATCH EXISTS
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_update_playoffs_picks_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let match = await dbUpdate.updateMatch(PLAYOFFS, req.body.matchid, req.body.team1, req.body.team2, req.body.start, req.body.end, req.body.date);
            if (match) {
                res.status(200).send(match); // OK
            } else if (match === 0) {
                res.status(404).send(NOT_FOUND); //NOT FOUND
            } else {
                res.status(409).send(MATCH_EXISTS) // MATCH EXISTS
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_update_picks_daily_picks_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let picks = await dbUpdate.updateMatchPicks(DAILY, req.body.matchid, req.body.username, req.body.team);
            res.status(200).send(picks); // OK
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_update_picks_playoffs_picks_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let picks = await dbUpdate.updateMatchPicks(PLAYOFFS, req.body.matchid, req.body.username, req.body.team);
            res.status(200).send(picks); // OK
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_update_preseason_awards_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let preseasonAwards = await dbUpdate.updatePreseasonAwards(req.body.SEASON, req.body.preseasonAwards);
            if (preseasonAwards !== null) {
                res.status(200).send(preseasonAwards); // OK
            } else {
                res.status(409).send(SEASON_EXISTS); // SEASON EXISTS
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_daily_picks_del = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let result = await dbDelete.deleteDailyMatches(req.body.matchid);
            if (result === 1) {
                res.sendStatus(200); // OK
            } else {
                res.status(404).send(NOT_FOUND); // NOT FOUND
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_daily_picks_all_del = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let result = await dbDelete.deleteAllMatches(DAILY);
            if (result > 0) {
                res.sendStatus(200); // OK
            } else {
                res.status(404).send(NOT_FOUND); // NOT FOUND
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_playoffs_picks_all_del = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let result = await dbDelete.deleteAllMatches(PLAYOFFS);
            if (result > 0) {
                res.sendStatus(200); // OK
            } else {
                res.status(404).send(NOT_FOUND); // NOT FOUND
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_preseason_picks_all_del = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            await dbDelete.deleteAllUserPreseasonObjects();
            res.sendStatus(200); // OK
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_preseason_awards_del = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let preseasonAwards = await dbDelete.deletePreseasonAwards(req.body.SEASON);
            if (preseasonAwards !== 0) {
                res.status(200).send(preseasonAwards); // OK
            } else {
                res.status(404).send(NOT_FOUND); // NOT FOUND
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};