var mongoConnect = require('../../mongoConnect');

const { USERS } = require('./DatabaseHelper');

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
}

module.exports = DatabaseDelete;