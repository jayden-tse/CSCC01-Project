var mongoConnect = require('../../mongoConnect');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
var passport = require('passport');

const { USERS, POSTS, FANALYST, Q, DEBATES } = require('./DatabaseHelper');

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
            posts.push(doc._id);
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
        let postid = { "_id": ObjectId(postId) };
        let post = await mongoConnect.getDBCollection(POSTS).findOne(postid);
        for (let i = 0; i < post.comments.length; i++) {
            if (post.comments[i]._id.toString() === commentId.toString()) {
                return post.comments[i];
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

    ACSToTier(acs) {
        if (acs < 300) {
            return FANALYST;
        } else if (acs < 600) {
            return ANALYST;
        } else if (acs < 900) {
            return PRO;
        } else {
            return EXPERT;
        }
    }
    async getAllDebateQuestions(tier) {
        let cursor = await mongoConnect.getDBCollection(DEBATES).find({ tier: tier });
        let questions = [];
        await cursor.forEach(function(doc) {
            questions.push(doc);
        });
        return questions;
    }

    async getRandomDebateQuestion(tier) {
        let questions = await this.getAllDebateQuestions(tier);
        let rand = Math.floor(Math.random() * questions.length);
        console.log(questions[rand]);
        return questions[rand];
    }

    async getAnalysis(username) {
        let query = {
            username: username
        };
        let user = await mongoConnect.getDBCollection(USERS).findOne(query);
        let analysis = user.profile.analysis;
        return analysis; // contains username, question, answer, score, and voters
    }
}

module.exports = DatabaseRead;