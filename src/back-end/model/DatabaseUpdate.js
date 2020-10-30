var mongoConnect = require('../../mongoConnect');

class DatabaseUpdate {

    async addUserToTracker(req, username) {
        let user = { 'username': req.user }
        let result = await mongoConnect.getDBCollection("Users").updateOne(user, {
            $addToSet: {
                "profile.tracker": username
            }
        });
        return result;
    }

    async updateMessage(req, type, message) {
        let messageType = 'profile.' + type;
        let user = { 'username': req.user };
        console.log(await mongoConnect.getDBCollection("Users").findOne(user));
        let result = await mongoConnect.getDBCollection("Users").updateOne(user, {
            $set: {
                [messageType]: message
            }
        });
        return result;
    }
}

module.exports = DatabaseUpdate;