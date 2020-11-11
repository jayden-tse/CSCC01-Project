var mongoConnect = require('../../mongoConnect');
const Comment = require('./Comment.js')
const ObjectId = require('mongodb').ObjectID; // used to search by Id

const { USERS, POSTS } = require('./DatabaseHelper');

class DatabaseUpdate {

    async updateUserTracker(req) {
        let username = { 'username': req.user }
        let user = await mongoConnect.getDBCollection(USERS).findOne(username);
        let tracker = user.profile.tracker;
        console.log(tracker);
        await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $set: {
                "profile.tracker": []
            }
        });
        for (let i = 0; i < tracker.length; i++) {
            let newUser = await mongoConnect.getDBCollection(USERS).findOne({ "username": tracker[i].username });
            let profile = newUser.profile;
            await mongoConnect.getDBCollection(USERS).updateOne(username, {
                $addToSet: {
                    "profile.tracker": { "username": tracker[i].username, "ACS": profile.ACS }
                }
            });
        }
        user = await mongoConnect.getDBCollection(USERS).findOne(username);
        return user.profile.tracker;
    }

    async updateMessage(req, type, message) {
        let messageType = 'profile.' + type;
        let username = { 'username': req.user };
        await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $set: {
                [messageType]: message
            }
        });
        return message;
    }

    async updateACS(username, ACS) {
        await mongoConnect.getDBCollection(USERS).updateOne({ "username": username }, {
            $set: {
                "profile.ACS": ACS
            }
        });
        return ACS;
    }

    async updateUser(req, type, message) {
        let username = { 'username': req.user };
        await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $set: {
                [type]: message
            }
        });
        return message;
    }

    async createComment(post, user, date, text, agrees, disagrees) {
        let comment = new Comment(user, date, text, agrees, disagrees); // should be in JSON format
        // post should be a unique ID
        let newPost = { "_id": ObjectId(post) };
        let result = await mongoConnect.getDBCollection(POSTS).updateOne(
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