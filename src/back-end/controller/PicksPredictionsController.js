const DatabaseCreate = require('../model/DatabaseCreate');
const DatabaseDelete = require('../model/DatabaseDelete');
const DatabaseUpdate = require('../model/DatabaseUpdate');
const DatabaseRead = require('../model/DatabaseRead');
const { WRITE_FAILED, NOT_AUTHENTICATED } = require('./StatusMessages');
const { DAILY, PLAYOFFS, PRESEASON } = require('./DatabaseHelper');
const dbCreate = new DatabaseCreate();
const dbDelete = new DatabaseDelete();
const dbUpdate = new DatabaseUpdate();
const dbRead = new DatabaseRead();

exports.matches_daily_picks_put = function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let match = await dbCreate.createMatch(DAILY, req.body.team1, req.body.team2, req.body.start, req.body.end);
            if (match !== null) {
                res.status(200).send(match); // OK
            } else {
                res.status(409).send(QUESTION_EXISTS)
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_playoffs_picks_put = function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let match = await dbCreate.createMatch(PLAYOFFS, req.body.team1, req.body.team2, req.body.start, req.body.end);
            if (match !== null) {
                res.status(200).send(match); // OK
            } else {
                res.status(409).send(QUESTION_EXISTS)
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

// exports.matches_preseason_picks_put = function (req, res) {
//     res.set({
//         'Access-Control-Allow-Credentials': true,
//         'Access-Control-Allow-Origin': 'http://localhost:3000'
//     });
//     if (req.user) {
//         // user is authenticated
//         try {
//             let match = await dbCreate.createMatch(PRESEASON, req.body.team1, req.body.team2, req.body.start, req.body.end);
//             if (match !== null) {
//                 res.status(200).send(match); // OK
//             } else {
//                 res.status(409).send(QUESTION_EXISTS)
//             }
//         } catch (e) {
//             console.error(e);
//             res.status(500).send(WRITE_FAILED); // Internal server error
//         }
//     } else {
//         res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
//     }
// };

exports.matches_daily_picks_get = function (req, res) {
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

exports.matches_playoffs_picks_get = function (req, res) {
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

// exports.matches_preseason_picks_get = function (req, res) {
//     res.set({
//         'Access-Control-Allow-Credentials': true,
//         'Access-Control-Allow-Origin': 'http://localhost:3000'
//     });
//     if (req.user) {
//         // user is authenticated
//         try {
//             let preseasonPicks = await dbRead.getPreseasonPicks();
//             res.status(200).send(preseasonPicks); // OK
//         } catch (e) {
//             console.error(e);
//             res.status(500).send(READ_FAILED); // Internal server error
//         }
//     } else {
//         res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
//     }
// };

exports.matches_update_daily_picks_put = function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let match = await dbUpdate.updateMatch(DAILY, req.body.matchid, req.body.team1, req.body.team2, req.body.start, req.body.end);
            if (match) {
                res.status(200).send(match); // OK
            } else {
                res.status(404).send(NOT_FOUND); //NOT FOUND
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

exports.matches_update_playoffs_picks_put = function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let match = await dbUpdate.updateMatch(PLAYOFFS, req.body.matchid, req.body.team1, req.body.team2, req.body.start, req.body.end);
            if (match) {
                res.status(200).send(match); // OK
            } else {
                res.status(404).send(NOT_FOUND); //NOT FOUND
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};

// exports.matches_update_preseason_picks_put = function (req, res) {
//     res.set({
//         'Access-Control-Allow-Credentials': true,
//         'Access-Control-Allow-Origin': 'http://localhost:3000'
//     });
//     if (req.user) {
//         // user is authenticated
//         try {
//             let match = await dbUpdate.updateMatch(PRESEASON, req.body.matchid, req.body.team1, req.body.team2, req.body.start, req.body.end);
//             if (match) {
//                 res.status(200).send(match); // OK
//             } else {
//                 res.status(404).send(NOT_FOUND); //NOT FOUND
//             }
//         } catch (e) {
//             console.error(e);
//             res.status(500).send(WRITE_FAILED); // Internal server error
//         }
//     } else {
//         res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
//     }
// };

exports.matches_daily_picks_del = function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let result = await dbDelete.deleteDailyPicks(req.body.matchid);
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

exports.matches_daily_picks_all_del = function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let result = await dbDelete.deleteAllDailyPicks();
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

exports.matches_playoffs_picks_all_del = function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let result = await dbDelete.deleteAllPlayoffsPicks();
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

// exports.matches_preseason_picks_all_del = function (req, res) {
//     res.set({
//         'Access-Control-Allow-Credentials': true,
//         'Access-Control-Allow-Origin': 'http://localhost:3000'
//     });
//     if (req.user) {
//         // user is authenticated
//         try {
//             let result = await dbDelete.deleteAllPreseasonPicks(req.body.matchid);
//             if (result > 0) {
//                 res.sendStatus(200); // OK
//             } else {
//                 res.status(404).send(NOT_FOUND); // NOT FOUND
//             }
//         } catch (e) {
//             console.error(e);
//             res.status(500).send(WRITE_FAILED); // Internal server error
//         }
//     } else {
//         res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
//     }
// };