var mongoConnect = require('../../mongoConnect');
const Comment = require('./Comment.js')
const ObjectId = require('mongodb').ObjectID; // used to search by Id

const { USERS, POSTS } = require('./DatabaseHelper');
const DatabaseRead = require('./DatabaseRead');
const dbRead = new DatabaseRead();

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

    async addSocialMediaLink(req, type, link) {
        let linkType = 'profile.links.' + type;
        let username = { 'username': req.user };
        let result = await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $set: {
                [linkType]: link
            }
        });
        return result;
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

    async updatePost(postId, type, message) {
        let post = { '_id': ObjectId(postId) };
        let result = await mongoConnect.getDBCollection(POSTS).updateOne(post, {
            $set: {
                [type]: message
            }
        });
        return result;
    }

    async helperVote(agree, disagree, postId) {
        // helps updateVote by updating the likes/dislikes.
        let post = { '_id': ObjectId(postId) };
        let postDoc = await mongoConnect.getDBCollection(POSTS).findOne(post)
        let postUpdate = {};
        if (agree !== 0) {
            postUpdate = {
                $set: {
                    agree: postDoc.agree + agree
                }
            };
        } else if (disagree !== 0) {
            postUpdate = {
                $set: {
                    disagree: postDoc.disagree + disagree
                }
            }
        }
        return await mongoConnect.getDBCollection(POSTS).updateOne(post, postUpdate);
    }

    async updateVote(username, vote, postId) {
        // updates the list of voters and number of likes/dislikes.
        let doc = await dbRead.getPost(postId)
        let postDoc = doc[0];
        if (postDoc !== null) {
            let agreed = postDoc.usersagreed; // should be an array of usernames (string)
            let disagreed = postDoc.usersdisagreed;
            let userAgreed = agreed.indexOf(username) !== -1; // found at non-negative index
            let userDisagreed = disagreed.indexOf(username) !== -1;

            if (vote > 0) { // agree
                /*
                    cases:
                    user agrees/disagrees for the first time
                        add them to the list
                    user revokes their agree/disagree by pressing the same button
                        remove their name from the list
                    user switches to disagree
                        remove name from other list and add it to new list
                */
                if (userDisagreed) {
                    // remove from disagreed
                    disagreed.splice(disagreed.findIndex(e => e === username), 1);
                    this.helperVote(0, -1, postId);
                    this.updatePost(postId, "usersdisagreed", disagreed);
                }

                if (userAgreed) {
                    // already liked, remove the like
                    agreed.splice(agreed.findIndex(e => e === username), 1);
                    this.helperVote(-1, 0, postId);
                } else {
                    // hasn't liked yet, add the like
                    agreed.push(username);
                    this.helperVote(1, 0, postId);
                }

                return this.updatePost(postId, "usersagreed", agreed); // either way update usersagreed on the post
            } else if (vote < 0) { // disagree
                if (userAgreed) {
                    // remove from agreed
                    agreed.splice(agreed.findIndex(e => e === username), 1);
                    this.helperVote(-1, 0, postId);
                    this.updatePost(postId, "usersagreed", agreed);
                }

                if (userDisagreed) {
                    // already disagreed, remove dislike
                    disagreed.splice(disagreed.findIndex(e => e === username), 1);
                    this.helperVote(0, -1, postId)
                } else {
                    // hasn't disagreed, add dislike
                    disagreed.push(username);
                    this.helperVote(0, 1, postId);
                }
                return this.updatePost(postId, "usersdisagreed", disagreed); // either way update usersdisagreed on the post
            }
        }
        return null;
    }

    // under dbUpdate instead of dbCreate because we update the post with a comment. Might change later if needed.
    async createComment(postId, user, date, text, usersagreed, usersdisagreed, agree, disagree) {
        let comment = new Comment(new ObjectId(), user, date, text, usersagreed, usersdisagreed, agree, disagree); // should be in JSON format
        // post should be a unique ID
        let post = { "_id": ObjectId(postId) };
        let result = await mongoConnect.getDBCollection(POSTS).updateOne(
            post, {
            $push: {
                comments: comment
            }
        }
        );
        return result;
    }

}
module.exports = DatabaseUpdate;