var mongoConnect = require('../../mongoConnect');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
var passport = require('passport');

const ObjectId = require('mongodb').ObjectID; // used to search by Id

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

    async getProfile(req) {
        let username = { "username": req.user }
        let result = await mongoConnect.getDBCollection("Users").findOne(username)
        console.log(result.profile);
        return result.profile;
    }

    async getPickHistory(req) {
        let username = { "username": req.user }
        let result = await mongoConnect.getDBCollection("Users").findOne(username)
        console.log(result.profile.picks);
        return result.profile.picks;
    }

    async getTracker(req) {
        let username = { "username": req.user }
        let result = await mongoConnect.getDBCollection("Users").findOne(username)
        console.log(result.profile.tracker);
        return result.profile.tracker;
    }

    async getProfilePicture(req) {
        let username = { "username": req.user };
        let result = await mongoConnect.getDBCollection("Users").findOne(username);
        console.log(result.profile.picture);
        return result.profile.picture; // should be a URL
    }

    async getAllPosts(req) {
        const posts = [];
        const cursor = await mongoConnect.getDBCollection("Posts").find(req);
        await cursor.forEach(function(doc) {
            posts.push(doc);
        });
        return posts;
    }

    async getLinks(req) {
        let username = { "username": req.user };
        let result = await mongoConnect.getDBCollection("Users").findOne(username)
        console.log(result.profile.links);
        return result.profile.links;
    }

    async getPost(req) {
        const posts = [];
        const cursor = await mongoConnect.getDBCollection("Posts").find({ "_id": ObjectId(req) });
        await cursor.forEach(function(doc) {
            posts.push(doc);
        });
        return posts;
    }

    async findUsername(username) {
        return await mongoConnect.getDBCollection("Users").findOne({ "username": username });
    }

    async findEmail(email) {
        return await mongoConnect.getDBCollection("Users").findOne({ "email": email });
    }

    async findPhoneNum(num) {
        return await mongoConnect.getDBCollection("Users").findOne({ "phonenum": num });
    }

    passwordChecker(password, hashedPassword) {
        let state = bcrypt.compareSync(password, hashedPassword);
        return state
    }
}

module.exports = DatabaseRead;