var mongoConnect = require('../../mongoConnect');

const { USERS } = require('./DatabaseHelper');

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
}

module.exports = DatabaseDelete;