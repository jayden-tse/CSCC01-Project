var mongoConnect = require('../../mongoConnect');
const dbRead = require('./DatabaseRead');

class DatabaseUpdate {
    async updateAbout(user, message) {
        let x = {
            $set: {
                'profile.about': message,
            },
        };
        let result = await mongoConnect.getDBCollection("Users").updateOne(user, x);
    }
    async update(user, message) {
        let x = {
            $set: {
                'profile.about': message,
            },
        };
        let result = await mongoConnect.getDBCollection("Users").updateOne(user, message);
    }
}