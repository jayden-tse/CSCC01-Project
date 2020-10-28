var mongoConnect = require('../../mongoConnect');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
var passport = require('passport');


passport.use(new LocalStrategy(
    async function(username, password, done) {
        Users = mongoConnect.getDBCollection("Users");
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
passport.serializeUser(function(user, done) {
    done(null, user.username);
});
passport.deserializeUser(function(username, done) {
    done(null, mongoConnect.getDBCollection("Users").findOne({ "username": username }));
});
class DatabaseRead {

    async findUsername(username) {
        return await mongoConnect.getDBCollection("Users").findOne({ "username": username });
    }
    
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