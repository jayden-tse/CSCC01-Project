var mongoConnect = require('../../mongoConnect');

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Profile = require('./Profile.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js');
const Match = require('./Match.js');
const ObjectId = require('mongodb').ObjectID;

const { USERS, POSTS, PRESEASON } = require('./DatabaseHelper');

// Business email from which users will get the confirmation.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sportcredyes@gmail.com',
        pass: 'projectyes'
    }
});

class DatabaseCreate {

    // Turn the data into a new User object with their Profile.
    // Store the User into the database. Also check for unique contact info and send
    // the user confirmation when their account has been successfully created.
    async createUser(user, questionnaire) {
        // Only store this user in the database if there exists no other accounts with
        // the same phone numbers and email.
        // default image
        let userProfile = new Profile('https://storage.googleapis.com/sample-bucket-sc/image1.jpg', '', '', questionnaire, [], [], 200, { facebook: '', instagram: '', twitter: '' });
        user.profile = userProfile;
        let hashedPassword = this.passwordHasher(user.password);
        user.password = hashedPassword;
        this.notifyUserForNewAccount(user);
        let result = await mongoConnect.getDBCollection(USERS).insertOne(user);
    }

    notifyUserForNewAccount(user) {
        let mailOptions = {
            from: 'sportcredyes@gmail.com',
            to: user.email,
            subject: 'New Account',
            text: 'Your SportCred account has been created successfully.'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    passwordHasher(password) {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }

    // Profile
    async addMatchToHistory(req, match) {
        let username = { 'username': req.user }
        await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $addToSet: {
                "profile.picks": match
            }
        });
        let user = await mongoConnect.getDBCollection(USERS).findOne(username);
        return user.profile.picks;
    }

    async addUserToTracker(req, addUsername) {
        let username = { 'username': req.user }
        let addUsernameResult = await mongoConnect.getDBCollection(USERS).findOne({ 'username': addUsername });
        await mongoConnect.getDBCollection(USERS).updateOne(username, {
            $addToSet: {
                "profile.tracker": { "username": addUsername, "ACS": addUsernameResult.profile.ACS }
            }
        });
        let user = await mongoConnect.getDBCollection(USERS).findOne(username);
        return user.profile.tracker;
    }

    // the Zone
    async createPost(user, date, content, agrees, disagrees, comments, agreeusers, disagreeusers, likes, dislikes) {
        let post = new Post(user, date, content, agrees, disagrees, comments, agreeusers, disagreeusers, likes, dislikes);
        let result = await mongoConnect.getDBCollection(POSTS).insertOne(post);
    }

    async createComment(postId, user, date, text, agree, disagree, usersagreed, usersdisagreed) {
        let comment = new Comment(new ObjectId(), user, date, text, agree, disagree, usersagreed, usersdisagreed); // should be in JSON format
        // post should be a unique ID
        let post = { "_id": ObjectId(postId) };
        let result = await mongoConnect.getDBCollection(POSTS).updateOne(
            post, {
            $push: {
                comments: comment
            }
        }
        );
        return result;
    }

    async createMatch(collection, team1, team2, start, end, date) {
        let newMatch = new Match(team1, team2, start, end, date, []);
        let result = await mongoConnect.getDBCollection(collection).findOne(newMatch)
        if (result === null) {
            await mongoConnect.getDBCollection(collection).insertOne(newMatch);
            let match = await mongoConnect.getDBCollection(collection).findOne(newMatch);
            return match;
        } else {
            return null;
        }
    }

    async createPreseasonObject(username, preseasonPicks) {
        await mongoConnect.getDBCollection(USERS).updateOne({ "username": username }, {
            $set: {
                "profile.preseasonPicks": preseasonPicks
            }
        });
        let result = await mongoConnect.getDBCollection(USERS).findOne({ "username": username });
        return result;
    }

    async createPreseasonAwards(preseasonAwards) {
        let result = await mongoConnect.getDBCollection(PRESEASON).findOne({ "SEASON": preseasonAwards.season });
        if (result === null) {
            await mongoConnect.getDBCollection(PRESEASON).insertOne(preseasonAwards);
            return preseasonAwards;
        } else {
            return null;
        }
    }

}

module.exports = DatabaseCreate;