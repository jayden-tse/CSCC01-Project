var mongoConnect = require('../../mongoConnect');
const Comment = require('./Comment.js')
const ObjectId = require('mongodb').ObjectID; // used to search by Id

class DatabaseUpdate {

    async addMatchToHistory(req, match) {
        let username = { 'username': req.user }
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $addToSet: {
                "profile.picks": match
            }
        });
        return result;
    }

    async addUserToTracker(req, addUsername) {
        let username = { 'username': req.user }
        let addUsernameResult = await mongoConnect.getDBCollection("Users").findOne({ 'username': addUsername });
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $addToSet: {
                "profile.tracker": [addUsername, addUsernameResult.profile.ACS]
            }
        });
        return result;
    }

    async updateMessage(req, type, message) {
        let messageType = 'profile.' + type;
        let username = { 'username': req.user };
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $set: {
                [messageType]: message
            }
        });
        return result;
    }

    async updateUser(req, type, message) {
        let username = { 'username': req.user };
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $set: {
                [type]: message
            }
        });
        return result;
    }

    async updatePost(postid, type, message) {
        let post = { '_id': ObjectId(postid) };
        let result = await mongoConnect.getDBCollection("Posts").updateOne(post, {
            $set: {
                [type]: message
            }
        });
        return result;
    }

    async updateVote(req, postid) {
        let username = { 'username': req.session.passport.user };
        console.log(username);
        let post = { '_id': ObjectId(postid) };
        let postDoc = await mongoConnect.getDBCollection("Posts").findOne(post);
        if (postDoc !== null) {
            let agreed = postDoc.agreeusers;
            let disagreed = postDoc.disagreed;
            if (agreed.find(username)) {
                // user already liked it, set it back to neutral
            }
        }
        return result;
    }

    async createComment(post, user, date, text, agrees, disagrees) {
        let comment = new Comment(user, date, text, agrees, disagrees); // should be in JSON format
        // post should be a unique ID
        let newPost = { "_id": ObjectId(post) };
        let result = await mongoConnect.getDBCollection("Posts").updateOne(
            newPost, {
                $push: {
                    comments: comment
                }
            }
        );
        return result;
    }
}
module.exports = DatabaseUpdate;