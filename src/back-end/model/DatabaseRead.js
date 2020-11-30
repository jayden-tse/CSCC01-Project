var mongoConnect = require('../../mongoConnect');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
var passport = require('passport');

const { USERS, POSTS, FANALYST, ANALYST, PRO, EXPERT, Q, A, DEBATES } = require('./DatabaseHelper');

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

    async getProfile(username) {
        let result = await mongoConnect.getDBCollection(USERS).findOne({ "username": username })
        return result.profile;
    }

    async getPickHistory(username) {
        let result = await mongoConnect.getDBCollection(USERS).findOne({ "username": username })
        return result.profile.picks;
    }

    async getTracker(username) {
        let result = await mongoConnect.getDBCollection(USERS).findOne({ "username": username })
        return result.profile.tracker;
    }

    async getProfilePicture(username) {
        let result = await mongoConnect.getDBCollection(USERS).findOne({ "username": username });
        return result.profile.picture; // should be a URL
    }

    async getLinks(username) {
        let result = await mongoConnect.getDBCollection(USERS).findOne({ "username": username })
        return result.profile.links;
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
        // helper fcn.
        let cursor = await mongoConnect.getDBCollection(DEBATES).find({ tier: tier });
        let questions = [];
        await cursor.forEach(function(doc) {
            questions.push(doc);
        });
        return questions;
    }

    async getTwoDebateQuestions(tier) {
        // used in the event loop; get 2 unique questions from a tier.
        // note that arr.splice(i, 2) could be used, but the two questions would
        // always be adjacent, which makes it less random.
        let questions = await this.getAllDebateQuestions(tier);

        let q1 = Math.floor(Math.random() * questions.length);
        let result = [];
        result.push(questions[q1]);
        questions.splice(q1, 1);

        let q2 = Math.floor(Math.random() * questions.length);
        result.push(questions[q2]);
        questions.splice(q2, 1);
        return result;
    }

    async getRandomDebateQuestion(tier) {
        // used in the event loop and when creating a new user; get a random question in the daily set of questions.
        let questions = await mongoConnect.getDBCollection(tier + Q).find({}).toArray();
        let rand = Math.floor(Math.random() * questions.length);
        return questions[rand];
    }

    async getAnalysis(username) {
        // get a user's analysis
        let query = {
            username: username
        };
        let user = await mongoConnect.getDBCollection(USERS).findOne(query);
        if (!user) return null;
        let collection = user.profile.debatetier + A;
        let analysis = await mongoConnect.getDBCollection(collection).findOne(query);
        return analysis; // contains username, tier, question, answer, score, voters, and numvoters. 
    }

    async getCurrentUserDebate(username) {
        // get user's debate question of the day
        let profile = await this.getProfile(username);
        return profile.debatequestion;
    }

    async getAllSubmissions(tier) {
        let cursor = mongoConnect.getDBCollection(tier + A).find({}).sort({ "question.question": -1 });
        let result = [];
        await cursor.forEach(function(doc) {
            result.push(doc.username);
        })
        return result;
    }
}

module.exports = DatabaseRead;