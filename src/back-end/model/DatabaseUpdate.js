var mongoConnect = require('../../mongoConnect');
const dbRead = require('./DatabaseRead');

class DatabaseUpdate {
    async updateMessage(user, type, message) {
        let messageType = 'profile.' + type;
        let x = {
            $set: {
                messageType: message,
            },
        };
        let result = await mongoConnect.getDBCollection("Users").updateOne(user, x);
        return result.acknowledged; // returns true if it succeeded
    }
}