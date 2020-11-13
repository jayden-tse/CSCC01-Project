var mongoConnect = require('../../mongoConnect');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
var passport = require('passport');

const { USERS, POSTS } = require('./DatabaseHelper');

const ObjectId = require('mongodb').ObjectID; // used to search by Id

passport.use(new LocalStrategy(
    async function(username, password, done) {
        Users = mongoConnect.getDBCollection(USERS);
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
    done(null, mongoConnect.getDBCollection(USERS).findOne({ "username": username }));
});

class DatabaseRead {

    async getProfile(req) {
        let username = { "username": req.user }
        let result = await mongoConnect.getDBCollection(USERS).findOne(username)
        console.log(result.profile);
        return result.profile;
    }

    async getPickHistory(req) {
        let username = { "username": req.user }
        let result = await mongoConnect.getDBCollection(USERS).findOne(username)
        console.log(result.profile.picks);
        return result.profile.picks;
    }

    async getTracker(req) {
        let username = { "username": req.user }
        let result = await mongoConnect.getDBCollection(USERS).findOne(username)
        console.log(result.profile.tracker);
        return result.profile.tracker;
    }

    async getProfilePicture(req) {
        let username = { "username": req.user };
        let result = await mongoConnect.getDBCollection(USERS).findOne(username);
        console.log(result.profile.picture);
        return result.profile.picture; // should be a URL
    }

    async getAllPosts(req) {
        const posts = [];
        const cursor = await mongoConnect.getDBCollection(POSTS).find(req);
        await cursor.forEach(function(doc) {
            posts.push(doc);
        });
        return posts;
    }

    async getPost(req) {
        const posts = [];
        const cursor = await mongoConnect.getDBCollection(POSTS).find({
            _id: ObjectId(req)
        });
        await cursor.forEach(function(doc) {
            posts.push(doc);
        });
        return posts;
    }

    async getAllComments(postId) {
        let post = await this.getPost(postId);
        return post[0].comments;
    }

    async getComment(postId, commentId) {
        let post = await this.getAllPosts({ '_id': ObjectId(postId) });
        for (let i = 0; i < post[0].comments.length; i++) {
            if (post[0].comments[i]._id.toString() === commentId.toString()) {
                return post[0].comments[i];
            }
        }
        return null;
    }

    async findUsername(username) {
        return await mongoConnect.getDBCollection(USERS).findOne({ "username": username });
    }

    async findEmail(email) {
        return await mongoConnect.getDBCollection(USERS).findOne({ "email": email });
    }

    async findPhoneNum(num) {
        return await mongoConnect.getDBCollection(USERS).findOne({ "phonenum": num });
    }

    passwordChecker(password, hashedPassword) {
        let state = bcrypt.compareSync(password, hashedPassword);
        return state
    }
}

module.exports = DatabaseRead;