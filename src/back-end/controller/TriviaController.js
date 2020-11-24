const DatabaseCreate = require('../model/DatabaseCreate');
const DatabaseDelete = require('../model/DatabaseDelete');
const DatabaseUpdate = require('../model/DatabaseUpdate');
const DatabaseRead = require('../model/DatabaseRead');
const { WRITE_FAILED, READ_FAILED, NOT_AUTHENTICATED, NOT_FOUND, QUESTION_EXISTS } = require('./StatusMessages');
const dbCreate = new DatabaseCreate();
const dbDelete = new DatabaseDelete();
const dbUpdate = new DatabaseUpdate();
const dbRead = new DatabaseRead();

exports.question_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let question = await dbCreate.createQuestion(req.body.question, req.body.answer, req.body.other);
            if (question !== null) {
                res.status(200).send(question); // OK
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

exports.question_random_10_get = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let questions = await dbRead.getQuestions10();
            res.status(200).send({ questions }.questions); // OK
        } catch (e) {
            console.error(e);
            res.status(500).send(READ_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
}

exports.question_all_get = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let questions = await dbRead.getQuestionsAll();
            res.status(200).send({ questions }.questions); // OK
        } catch (e) {
            console.error(e);
            res.status(500).send(READ_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
}

exports.question_update_put = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let question = await dbUpdate.updateQuestion(req.body.questionid, req.body.question, req.body.answer, req.body.other);
            if (question) {
                res.status(200).send(question); // OK
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

exports.question_del = async function (req, res) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
    });
    if (req.user) {
        // user is authenticated
        try {
            let result = await dbDelete.deleteQuestion(req.body.question);
            if (result === 1) {
                res.sendStatus(200); // OK
            } else {
                res.sendStatus(404); // NOT FOUND
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(WRITE_FAILED); // Internal server error
        }
    } else {
        res.status(401).send(NOT_AUTHENTICATED); // Unauthorized (not logged in)
    }
};