const { ObjectId } = require('mongodb');
var mongoConnect = require('../../mongoConnect');

const { USERS, POSTS, DAILY } = require('./DatabaseHelper');

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

    async deleteDailyPicks(matchid) {
        let result = await mongoConnect.getDBCollection(DAILY).deleteOne({ "_id": ObjectId(matchid) });
        return result.deletedCount;
    }

    async deleteAllPicks(collection) {
        let result = await mongoConnect.getDBCollection(collection).deleteMany({});
        return result.result.n;
    }
}

module.exports = DatabaseDelete;