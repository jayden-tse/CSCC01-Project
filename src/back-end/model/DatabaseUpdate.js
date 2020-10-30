var mongoConnect = require('../../mongoConnect');

class DatabaseUpdate {

    async addMatchToHistory(req, match) {
        let username = { 'username': req.user }
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $addToSet: {
               "profile.picks":  match
            }
        });
        return result;
    }

    async addUserToTracker(req, addUsername) {
        let username = { 'username': req.user }
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $addToSet: {
                "profile.tracker": addUsername
            }
        });
        return result;
    }

    async updateMessage(req, type, message) {
        let messageType = 'profile.' + type;
        let username = { 'username': req.user };
        console.log(await mongoConnect.getDBCollection("Users").findOne(username));
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $set: {
                [messageType]: message
            }
        });
        return result;
    }
}

module.exports = DatabaseUpdate;