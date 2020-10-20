const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://SPORTCRED:1234@sportcred.q4w2z.mongodb.net/SPORTCRED?retryWrites=true&w=majority";
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    async function(username, password, done) {
        await client.connect();
        Users = client.db("SPORTCRED").collection("Users");
        Users.findOne({ username: username },
            function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                let x = new DatabaseRead();
                if (!x.passwordChecker(password, user.password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
    }
));

class DatabaseRead {
    async findEmail(client, email) {
        return await client.db("SPORTCRED").collection("Users").findOne({ "email": email });
    }

    async findPhoneNum(client, num) {
        return await client.db("SPORTCRED").collection("Users").findOne({ "phoneNum": num });
    }

    passwordChecker(password, hashedPassword) {
        let state = bcrypt.compareSync(password, hashedPassword);
        return state
    }
}