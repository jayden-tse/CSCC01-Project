var mongoConnect = require('../../mongoConnect');

const ObjectId = require('mongodb').ObjectID; // used to search by Id

const { USERS, POSTS, Q, A, FANALYST, ANALYST, EXPERT, PRO } = require('./DatabaseHelper');
const DatabaseRead = require('./DatabaseRead');
const dbRead = new DatabaseRead();
const DatabaseDelete = require('./DatabaseDelete');
const dbDelete = new DatabaseDelete();

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

    async voteOnAnalysis(analysis, username, vote) {
        // username will be voting on analysis with vote as their value (value between 0 and 100 that is divisible by 10)
        // if user voted
        //      if the user wants to remove their vote
        //          score = (score*numvoters - uservote)/(numvoters-1)
        //          numvoters -= 1;
        //          update
        //      else
        //          score = (score*numvoters - oldvote + newvote)/numvoters
        //          update
        // if user hasn't voted
        //      score = (score*numvoters + newvote)/(numvoters+1)
        //      numvoters += 1;
        //      update
        let collection = analysis.tier + A;
        // https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript 2nd ans
        let index = analysis.voters.findIndex(o => o.username === username);
        let profile = await dbRead.getProfile(username)
        if (index >= 0) {
            // user already voted
            if (analysis.voters[index].vote === vote) return { modifiedCount: 1 }; // cheaty way to bypass same vote not increasing modifiedCount.
            if (vote >= 0 && vote <= 100) { // if user wants to change their vote

                analysis.score = (analysis.score * analysis.numvoters - analysis.voters[index].vote + vote) / analysis.numvoters;
                analysis.voters[index] = { username: username, vote: vote };
            } else if (vote < 0) { // if user wants to remove their vote
                // avoids division by 0
                analysis.score = analysis.numvoters - 1 === 0 ? 0 : (analysis.score * analysis.numvoters - analysis.voters[index].vote) / (analysis.numvoters - 1);
                analysis.voters.splice(index, 1);
                analysis.numvoters -= 1;
                profile.votes -= 1;
            }
            // treat as bad input (vote > 100)
        } else {
            if (vote >= 0 && vote <= 100) {
                // user hasn't voted yet
                analysis.score = (analysis.score * analysis.numvoters + vote) / (analysis.numvoters + 1);
                analysis.voters.push({ username: username, vote: vote });
                analysis.numvoters += 1;
                profile.votes += 1;
            }
            // treat as bad input if vote < 0 when user hasn't voted
        }
        // update
        await mongoConnect.getDBCollection(USERS).updateOne({ "profile._id": profile._id }, { $set: { "profile.votes": profile.votes } })

        return await mongoConnect.getDBCollection(collection).updateOne({
            "_id": new ObjectId(analysis._id)
        }, {
            $set: analysis
        });

    }

    async archiveDatabase() {
        // to complete
    }

    getBestDebate(group) {
        // gets the debate with the highest score of a group
        if (!group) return null;
        let bestDebate = { score: -1 };
        group.forEach(function(debate) {
            if (debate.score > bestDebate.score) {
                bestDebate = debate;
            }
        });
        if (bestDebate.score < 0) return null;
        else return bestDebate;
    }

    addToACS(ACS, points) {
        // helper to add points to ACS and keep it within the bounds.
        // what should the order of points be?
        // should it only round at the end of the day? 
        // edge case: user is at 1100 and had a net gain of points but forgot to submit their analysis/vote
        //      now the user will be < 1100 even though they've been gaining points all day
        if (ACS + points < 100) return 100;
        else if (ACS + points > 1100) return 1100;
        else return ACS + points;
    }

    scoreToACS(score) {
        // 0%-10%: 1pt
        // 11%-20%: 2pts
        // ...
        // 91%-100%: 10pts
        return Math.max(1, Math.ceil(score / 10)); // Math.max used in case user gets 0%.
    }

    async finalizeDebates() {
        let tiers = [FANALYST, ANALYST, EXPERT, PRO];
        let cursor;
        let BESTPTS = 5; // constant
        let profile;
        let best;
        for (let collection of tiers) {
            cursor = await mongoConnect.getDBCollection(collection + A).find({}).toArray();
            let groupCtr = 0;
            let group = [];
            for (let doc of cursor) {
                // give user 
                profile = await dbRead.getProfile(doc.username);
                profile.ACS = this.addToACS(profile.ACS, scoreToACS(doc.profile.score));
                // group in 3's unless unavailable
                await mongoConnect.getDBCollection(USERS).updateOne({ username: username }, { $set: {} });
                if (groupCtr < 2) { // 0, 1
                    group.push(doc);
                    groupCtr += 1;
                } else {
                    // add last member
                    group.push(doc);
                    // compare values
                    best = this.getBestDebate(group);
                    console.log(best);
                    if (best) {
                        // add 5 pts to best ACS
                        profile = await dbRead.getProfile(best.username);
                        console.log(profile === null);
                        profile.ACS = this.addToACS(profile.ACS, BESTPTS);
                        // update
                    }
                    // reset groupings
                    group.length = 0;
                    groupCtr = 0;
                    console.log(groupCtr);
                }
                await mongoConnect.getDBCollection(USERS).updateOne({ "profile._id": profile._id }, { $set: { "profile.ACS": profile.ACS } });
            };

            // in case there's a group of 1 or 2
            best = this.getBestDebate(group);
            if (best) {
                // add 5 pts to best ACS
                console.log(best);
                profile = await dbRead.getProfile(best.username);
                profile.ACS = this.addToACS(profile.ACS, BESTPTS);
                // update
                await mongoConnect.getDBCollection(USERS).updateOne({ "profile._id": profile._id }, { $set: { "profile.ACS": profile.ACS } });
            }

            // all scoring is done; archive/log the debates
            //      TODO: implement archiving

            // archiving done; delete submissions/questions and get new set
            let collQ = await dbDelete.deleteCollectionContent(collection + Q);
            let collA = await dbDelete.deleteCollectionContent(collection + A);

            console.log("DEBUG: deleted " + collQ.deletedCount + " Q's and " + collA.deletedCount + " A's for " + collection + ".");
            // deleting done; repopulate questions
            let newQuestions = await dbRead.getTwoDebateQuestions(collection);
            await mongoConnect.getDBCollection(collection + Q).insertMany(newQuestions, { ordered: true }); // ordered makes it stop if one fails
        }
    }

    async updateDaily() {
        // anything that changes on a daily basis should change here.
        await this.finalizeDebates();

        let userCursor = await mongoConnect.getDBCollection(USERS).find({}).toArray();
        let MINVOTES = 3; // can be changed later depending on the min. # of votes required to be considered as "participating"
        let PPTS = 10; // same as above
        let newTier = FANALYST; // default value
        for (let doc of userCursor) {
            // voting
            if (doc.profile.votes >= MINVOTES) {
                doc.profile.ACS = this.addToACS(doc.profile.ACS, PPTS)
            } else {
                doc.profile.ACS = this.addToACS(doc.profile.ACS, -PPTS / 2)
            }
            doc.profile.votes = 0;

            // after all ACS updates
            newTier = await dbRead.ACSToTier(doc.profile.ACS);
            doc.profile.debatetier = newTier;
            doc.profile.debatequestion = await dbRead.getRandomDebateQuestion(newTier);

            // update user
            await mongoConnect.getDBCollection(USERS).updateOne({ username: doc.username }, { $set: { profile: doc.profile } });
        };
    }
}
module.exports = DatabaseUpdate;