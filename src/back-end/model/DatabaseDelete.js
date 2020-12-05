const { ObjectId } = require('mongodb');
var mongoConnect = require('../../mongoConnect');

const { USERS, POSTS, DAILY, PRESEASON, QUESTIONS } = require('./DatabaseHelper');

class DatabaseDelete {

    async removeUserFromTracker(req, removeUsername) {
        let username = { 'username': req.user }
        let result = await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $pull: {
                "profile.tracker": { "username": removeUsername }
            }
        });
        return result.modifiedCount;
    }

    async deletePost(post) {
        return await mongoConnect.getDBCollection(POSTS).deleteOne(post)
    }

    async deleteComment(post, comment) {
        let result = await mongoConnect.getDBCollection(POSTS).updateOne({
            _id: post[0]._id
        }, {
            $pull: {
                comments: { _id: comment._id }
            }
        })
        return result;
    }

    async deleteDailyMatches(matchid) {
        let result = await mongoConnect.getDBCollection(DAILY).deleteOne({ "_id": ObjectId(matchid) });
        return result.deletedCount;
    }

    async deleteAllMatches(collection) {
        let result = await mongoConnect.getDBCollection(collection).deleteMany({});
        return result.result.n;
    }

    async deleteAllUserPreseasonObjects() {
        let cursor = await mongoConnect.getDBCollection(USERS).find();
        await cursor.forEach(async function (user) {
            await mongoConnect.getDBCollection(USERS).updateOne(user, {
                $unset: {
                    "profile.preseasonPicks": ""
                }
            });
        });
    }

    async deletePreseasonAwards(season) {
        let result = await mongoConnect.getDBCollection(PRESEASON).deleteOne({ "season": season });
        return result.deletedCount;
    }

    async deleteCollectionContent(collection) {
        return await mongoConnect.getDBCollection(collection).deleteMany({});
    }

    async deleteQuestion(question) {
        let result = await mongoConnect.getDBCollection(QUESTIONS).deleteOne({ "question": question });
        return result.deletedCount;
    }
}

module.exports = DatabaseDelete;