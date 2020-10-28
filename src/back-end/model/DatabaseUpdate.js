var mongoConnect = require('../../mongoConnect');
const dbRead = require('./DatabaseRead');

class DatabaseUpdate {
    async updateMessage(user, type, message) {
        let messageType = 'profile.' + type;
        let userJson = { 'username': user.user };
        console.log(await mongoConnect.getDBCollection("Users").findOne(userJson));
        let result = await mongoConnect.getDBCollection("Users").updateOne(userJson, {
            $set: {
                [messageType]: message
            }
        });
        return result;
    }
}
module.exports = DatabaseUpdate;