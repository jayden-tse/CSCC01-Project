var mongoConnect = require('../../mongoConnect');

class DatabaseDelete {

    async removeUserFromTracker(req, username) {
        let user = { 'username': req.user }
        let result = await mongoConnect.getDBCollection("Users").updateOne(user, {
            $pull: {
                "profile.tracker": username
            }
        });
        return result;
    }
}

module.exports = DatabaseDelete;