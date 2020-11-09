const DatabaseCreate = require('../model/DatabaseCreate.js');
const DatabaseRead = require('../model/DatabaseRead.js');
const DatabaseUpdate = require('../model/DatabaseUpdate.js');
const dbCreate = new DatabaseCreate();
const dbRead = new DatabaseRead();
const dbUpdate = new DatabaseUpdate();
exports.the_zone_post_put = async function(req, res) {
    if (req.user) {
        // user authenticated
        // user, date, content, agree, disagree, comments
        try {
            await dbCreate.createPost(req.session.passport.user, new Date(), req.body.content, 0, 0, [], [], []);
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.status(500).send('WRITE FAILED');
        }
    } else {
        res.status(401).send('NOT AUTHORIZED');
    }
};

exports.the_zone_post_get = async function(req, res) {
    if (req.user) {
        try {
            res.status(200).json(await dbRead.getPost(req.query.post));
        } catch (e) {
            console.log(e);
            res.status(500).send('WRITE FAILED');
        }
    } else {
        res.status(401).send('NOT AUTHORIZED');
    }
};

exports.the_zone_all_posts_get = async function(req, res) {
    if (req.user) {
        try {
            res.status(200).json(await dbRead.getAllPosts({}));
        } catch (e) {
            console.log(e);
            res.status(500).send('WRITE FAILED');
        }
    } else {
        res.status(401).send('NOT AUTHORIZED');
    }
};

exports.the_zone_update_post_put = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.the_zone_update_vote_put = async function(req, res) {
    if (req.user) {
        try {
            // update likes here
            let username = { 'username': req.session.passport.user };
            let result = await dbUpdate.updateVote(username, req.body.vote, req.body.postid);
            if (result && result.modifiedCount > 0) {
                res.sendStatus(200);
            } else {
                res.status(400).send('BAD INPUT');
            }
        } catch (e) {
            console.log(e);
            res.status(500).send('WRITE FAILED');
        }
    } else {
        res.status(401).send('NOT AUTHORIZED');
    }
};

exports.the_zone_comment_put = async function(req, res) {
    if (req.user) {
        try {
            await dbUpdate.createComment(req.body.post, req.session.passport.user, new Date(), req.body.text, 0, 0);
            res.sendStatus(200); // OK
        } catch (e) {
            console.log(e);
            res.status(500).send('WRITE FAILED');
        }
    } else {
        res.status(401).send('NOT AUTHORIZED')
    }
}

exports.the_zone_post_del = function(req, res) {
    res.send('NOT IMPLEMENTED');
};