const DatabaseCreate = require('../model/DatabaseCreate.js');
const dbCreate = new DatabaseCreate();

exports.the_zone_post_put = async function(req, res) {
    if (req.user) {
        // user authenticated
        // user, date, content, likes, dislikes, comments
        try {
            // user/date should be a string, content can be a json that contains img/vid + "text" string, comments should be an array of jsons where
            // content is replaced by "text".
            await dbCreate.createPost(req.session.passport.user, new Date(), req.body.content, "0", "0", []);
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.status(500).send("WRITE FAILED");
        }
    } else {
        res.status(401).send("NOT AUTHORIZED");
    }
};

exports.the_zone_post_get = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.the_zone_update_post_put = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.the_zone_update_likes_put = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.the_zone_post_del = function(req, res) {
    res.send('NOT IMPLEMENTED');
};