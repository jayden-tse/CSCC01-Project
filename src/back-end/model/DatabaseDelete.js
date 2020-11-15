var mongoConnect = require('../../mongoConnect');

const { USERS, POSTS } = require('./DatabaseHelper');

class DatabaseDelete {

    async removeUserFromTracker(req, username) {
        let user = { 'username': req.user }
        let result = await mongoConnect.getDBCollection(USERS).updateOne(user, {
            $pull: {
                "profile.tracker": username
            }
        });
        return result;
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
}

module.exports = DatabaseDelete;