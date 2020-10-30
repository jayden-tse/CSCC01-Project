const bcrypt = require('bcrypt');
const saltRounds = 10;

class Utilities {
    passwordHasher(password) {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }
}

module.exports = Utilities;