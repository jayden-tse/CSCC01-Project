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
        let addUsernameResult = await mongoConnect.getDBCollection("Users").findOne({ 'username': addUsername });
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $addToSet: {
                "profile.tracker": [addUsername, addUsernameResult.profile.ACS]
            }
        });
        return result;
    }

    async addSocialMediaLink(req, type, link) {
        let linkType = 'profile.links.' + type;
        let username = { 'username': req.user };
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $set: {
                [linkType]: link
            }
        });
        return result;
    }

    async updateMessage(req, type, message) {
        let messageType = 'profile.' + type;
        let username = { 'username': req.user };
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $set: {
                [messageType]: message
            }
        });
        console.log(await mongoConnect.getDBCollection("Users").findOne(username));
        return result;
    }

    async updateUser(req, type, message) {
        let username = { 'username': req.user };
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $set: {
                [type]: message
            }
        });
        console.log(await mongoConnect.getDBCollection("Users").findOne(username));
        return result;
    }
}

module.exports = DatabaseUpdate;