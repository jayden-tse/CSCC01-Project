var mongoConnect = require('../../mongoConnect');
const ObjectId = require('mongodb').ObjectID; // used to search by Id

const { USERS, POSTS } = require('./DatabaseHelper');
const DatabaseRead = require('./DatabaseRead');
const dbRead = new DatabaseRead();
class DatabaseUpdate {

    async updateUserTracker(userToUpdate) {
        let username = { 'username': userToUpdate }
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

    async updateSocialMediaLink(req, type, link) {
        let linkType = 'profile.links.' + type;
        let username = { 'username': req.user };
        await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $set: {
                [linkType]: link
            }
        });
        return link;
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
        let post = { "_id": ObjectId(postId) };
        let postDoc = await mongoConnect.getDBCollection(POSTS).findOne(post);
        if (postDoc !== null) {
            let agreed = postDoc.usersagreed; // should be an array of usernames (string)
            let disagreed = postDoc.usersdisagreed;
            let userAgreed = agreed.indexOf(username) !== -1; // found at non-negative index
            let userDisagreed = disagreed.indexOf(username) !== -1;

            if (vote > 0) { // agree
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
                let result = []
                result.push(postDoc.agree - postDoc.disagree);
                result.push(await this.updatePost(postId, "usersagreed", agreed)); // either way update usersagreed on the post
                return result;
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
                let result = []
                result.push(postDoc.agree - postDoc.disagree);
                result.push(await this.updatePost(postId, "usersdisagreed", disagreed)); // either way update usersdisagreed on the post
                return result;

            }
        }
        return null;
    }


    async updateComment(postId, commentId, type, content) {
        let query = {
            _id: ObjectId(postId),
            "comments._id": ObjectId(commentId)
        }
        let updateString = "comments.$." + type;
        let updateData = {
            [updateString]: content
        }
        let result = await mongoConnect.getDBCollection(POSTS).updateOne(query, { $set: updateData });
        return result;
    }

    async helperVoteComment(agree, disagree, comment, postId) {
        if (agree !== 0) {
            comment.agree = comment.agree + agree;
            return this.updateComment(postId, comment._id, "agree", comment.agree)
        } else if (disagree !== 0) {
            comment.disagree = comment.disagree + disagree;
            return this.updateComment(postId, comment._id, "disagree", comment.disagree);
        }
    }

    async voteComment(username, vote, postId, commentId) {
        // plan: extract all comments, look for 1 to modify, send whole array back
        let post = { "_id": ObjectId(postId) };
        let result = await mongoConnect.getDBCollection(POSTS).findOne(post);
        if (result) {
            // nonempty post
            let comment = await dbRead.getComment(postId, commentId);
            if (comment) {
                // nonempty list of comments was found and comment was found
                // start modifying comment likes/dislikes etc
                let agreed = comment.usersagreed;
                let disagreed = comment.usersdisagreed;
                let userAgreed = agreed.indexOf(username) !== -1;
                let userDisagreed = disagreed.indexOf(username) !== -1;
                if (vote > 0) { // agree
                    if (userDisagreed) {
                        // remove from disagreed
                        disagreed.splice(disagreed.findIndex(e => e === username), 1);
                        this.helperVoteComment(0, -1, comment, postId);
                        comment.usersdisagreed = disagreed;
                        this.updateComment(postId, commentId, "usersdisagreed", disagreed);
                    }

                    if (userAgreed) {
                        console.log("agreed");
                        // already liked, remove the like
                        agreed.splice(agreed.findIndex(e => e === username), 1);
                        comment.usersagreed = agreed;
                        this.helperVoteComment(-1, 0, comment, postId);
                    } else {
                        // hasn't liked yet, add the like
                        agreed.push(username);
                        comment.usersagreed = agreed;
                        this.helperVoteComment(1, 0, comment, postId);
                    }
                    let result = []
                    result.push(comment.agree - comment.disagree);
                    result.push(await this.updateComment(postId, commentId, "usersagreed", agreed)); // either way update usersdisagreed on the post
                    return result;
                } else if (vote < 0) { // disagree
                    if (userAgreed) {
                        // remove from agreed
                        agreed.splice(agreed.findIndex(e => e === username), 1);
                        this.helperVoteComment(-1, 0, comment, postId);
                        comment.usersagreed = agreed;
                        this.updateComment(postId, commentId, "usersagreed", agreed);
                    }

                    if (userDisagreed) {
                        // already disagreed, remove dislike
                        disagreed.splice(disagreed.findIndex(e => e === username), 1);
                        this.helperVoteComment(0, -1, comment, postId)
                    } else {
                        // hasn't disagreed, add dislike
                        disagreed.push(username);
                        this.helperVoteComment(0, 1, comment, postId);
                    }
                    let result = []
                    result.push(comment.agree - comment.disagree);
                    result.push(await this.updateComment(postId, commentId, "usersdisagreed", disagreed)); // either way update usersdisagreed on the post
                    return result;

                }
            }
        }
    }

}
module.exports = DatabaseUpdate;