var mongoConnect = require('../../mongoConnect');

const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    async function(username, password, done) {
        Users = DB.collection("Users");
        Users.findOne({ username: username },
            function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                let dbRead = new DatabaseRead();
                if (!dbRead.passwordChecker(password, user.password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
    }
));

class DatabaseRead {
    async findEmail(email) {
        return await mongoConnect.getDBCollection("Users").findOne({ "email": email });
    }

    async findPhoneNum(num) {
        return await mongoConnect.getDBCollection("Users").findOne({ "phoneNum": num });
    }

    passwordChecker(password, hashedPassword) {
        let state = bcrypt.compareSync(password, hashedPassword);
        return state
    }
}

module.exports = DatabaseRead;