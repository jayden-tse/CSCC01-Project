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
            console.log(TIERS);
            console.log(FANALYST);
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
            let profile = await dbRead.getProfile({ user: req.session.passport.user });
            console.log("user ACS: " + profile.ACS);
            let tier = await dbRead.ACSToTier(profile.ACS);
            console.log(req.session.passport);
            await dbCreate.createAnalysis(req.session.passport.user, tier, profile.debateQuestion.question, req.body.answer);

            // delete unused variables (for the user only)
            let result = {
                username: req.session.passport.user,
                tier: tier,
                question: profile.debateQuestion.question,
                answer: req.body.answer
            }

            // add to user's profile; saves their tier to ensure ACS changing won't affect user's score
            await dbUpdate.updateUser(req.session.passport, 'profile.analysis', result) // appends to user.profile.analysis
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.status(500).send(WRITE_FAILED);
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED);
    }
};

exports.debate_topics_get = function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
    if (req.user) {
        try {

        } catch (e) {
            res.status(500).send(WRITE_FAILED);
        }
    }
};

exports.debate_submission_get = function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
};

exports.debate_submission_time_limit_get = function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
};

exports.debate_update_topics_put = function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
};

exports.debate_submission_update_score_put = function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
};

exports.debate_topics_del = function(req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    })
};