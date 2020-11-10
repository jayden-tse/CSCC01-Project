var mongoConnect = require('../../mongoConnect');
const Comment = require('./Comment.js')
const ObjectId = require('mongodb').ObjectID; // used to search by Id

const { USERS, POSTS} = require('./DatabaseHelper');

class DatabaseUpdate {

    async addMatchToHistory(req, match) {
        let username = { 'username': req.user }
        let result = await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $addToSet: {
                "profile.picks": match
            }
        });
        return result;
    }

    async addUserToTracker(req, addUsername) {
        let username = { 'username': req.user }
        let addUsernameResult = await mongoConnect.getDBCollection(USERS).findOne({ 'username': addUsername });
        let result = await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $addToSet: {
                "profile.tracker": [addUsername, addUsernameResult.profile.ACS]
            }
        });
        return result;
    }

    async updateMessage(req, type, message) {
        let messageType = 'profile.' + type;
        let username = { 'username': req.user };
        let result = await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $set: {
                [messageType]: message
            }
        });
        return result;
    }

    async updateUser(req, type, message) {
        let username = { 'username': req.user };
        let result = await mongoConnect.getDBCollection(USERS).updateOne(username, {
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

    async updateVote(username, vote, postid) {
        console.log(username);
        let post = { '_id': ObjectId(postid) };
        let postDoc = await mongoConnect.getDBCollection("Posts").findOne(post);
        console.log(postDoc);
        if (postDoc !== null) {
            let agreed = postDoc.usersagreed; // should be an array of usernames in json
            let disagreed = postDoc.usersdisagreed;
            if (vote > 0) {
                if (agreed.indexOf(username) !== -1) {
                    agreed = agreed.filter(function(e) {
                        return e !== agreed.find(username);
                    });
                } else {
                    agreed.splice(agreed.length, 0, username);
                }
                console.log("agreed " + agreed);
                return this.updatePost(postid, "usersagreed", agreed); // either way update usersagreed on the post
            } else if (vote < 0) {
                if (disagreed.indexOf(username) !== -1) {
                    disagreed = disagreed.filter(function(e) {
                        return e !== disagreed.find(username);
                    });
                } else {
                    disagreed.splice(disagreed.length, 0, username);
                }
                console.log("disagreed " + disagreed);
                return this.updatePost(postid, "usersdisagreed", disagreed); // either way update usersdisagreed on the post
            } else return null;
        } else return null;
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