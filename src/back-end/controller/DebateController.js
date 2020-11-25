const DatabaseCreate = require('../model/DatabaseCreate.js');
const DatabaseRead = require('../model/DatabaseRead.js');
const DatabaseUpdate = require('../model/DatabaseUpdate.js');
const DatabaseDelete = require('../model/DatabaseDelete.js');
const { WRITE_FAILED, NOT_AUTHENTICATED, BAD_INPUT, NOT_FOUND } = require('./StatusMessages.js');
const dbCreate = new DatabaseCreate();
const dbRead = new DatabaseRead();
const dbUpdate = new DatabaseUpdate();
const dbDelete = new DatabaseDelete();
const FANALYST = "Fanalyst";
const ANALYST = "Analyst";
const PRO = "Pro Analyst";
const EXPERT = "Expert Analyst";
const Q = " Q";
const A = " A";
const TIERS = [FANALYST, ANALYST, EXPERT, PRO];

exports.debate_topics_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })

    if (req.user) { // need to change to admin account later?
        try {
            if (TIERS.indexOf(req.body.tier) > -1) { // matches one of the tiers
                await dbCreate.createDebateQuestion(req.body.tier, req.body.question); // will throw an error if it fails
                res.sendStatus(200);
            } else {
                res.status(400).send(BAD_INPUT);
            }
        } catch (e) {
            res.status(500).send(WRITE_FAILED);
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};

exports.debate_submission_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
    if (req.user) {
        try {
            // take user's ACS and converts it to a tier
            let profile = await dbRead.getProfile(req.session.passport.user);
            let tier = await dbRead.ACSToTier(profile.ACS);
            await dbCreate.createAnalysis(req.session.passport.user, tier, profile.debatequestion, req.body.answer);
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.status(500).send(WRITE_FAILED);
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};

exports.debate_topics_get = async function(req, res) {
    res.set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        })
        // to get a user's debate topic
    if (req.user) {
        try {
            let q = await dbRead.getCurrentUserDebate(req.session.passport.user);
            res.status(200).json({ "question": q });
        } catch (e) {
            res.status(500).send(WRITE_FAILED);
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};

exports.debate_submission_get = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
    if (req.user) {
        try {
            let result = await dbRead.getAnalysis(req.session.passport.user);
            if (result && result.answer) {
                res.status(200).send(result);
            } else {
                res.status(400).send(NOT_FOUND); // user hasn't submitted a question today
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(WRITE_FAILED);
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};

exports.debate_submission_time_limit_get = async function(req, res) {
    res.set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        })
        // tomorrow 0000 - new Date()
};

exports.debate_update_topics_put = async function(req, res) {
    res.set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        })
        // update the daily questions
};

exports.debate_submission_update_score_put = async function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })

    // update debate score based on votes
    // require submission user and current user's vote
    if (req.user) {
        try {
            let analysis = await dbRead.getAnalysis(req.body.username);
            if (analysis && analysis.username !== req.session.passport.user) { // exists + not the owner
                let result = await dbUpdate.voteOnAnalysis(analysis, req.session.passport.user, req.body.vote);
                if (result && result.modifiedCount) {
                    res.sendStatus(200);
                } else {
                    res.status(400).send(BAD_INPUT);
                }
            } else {
                res.status(404).send(NOT_FOUND);
            }
        } catch (e) {
            console.log(e);
            res.status(500).send(WRITE_FAILED);
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};

exports.debate_topics_del = async function(req, res) {
    res.set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        })
        // delete the daily topics
};