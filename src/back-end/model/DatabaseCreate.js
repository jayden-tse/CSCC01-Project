var mongoConnect = require('../../mongoConnect');

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Profile = require('./Profile.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js');
const Debate = require('./Debate.js');
const Analysis = require('./Analysis.js')
const ObjectId = require('mongodb').ObjectID;

const DatabaseRead = require('./DatabaseRead.js');
const { USERS, POSTS } = require('./DatabaseHelper');
const dbRead = new DatabaseRead();

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
        let userProfile = new Profile('https://storage.googleapis.com/sample-bucket-sc/image1.jpg', '', '', questionnaire, [], [], 100);
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

        transporter.sendMail(mailOptions, function(error, info) {
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

    // Debate
    async addDebateQuestion(tier, question, start, end) {
        // Only for creating the questions, normal users shouldn't have access to this
        let debate = new Debate(tier, question, start, end);
        let query = { "tier": tier }
        let result = await mongoConnect.getDBCollection(DEBATES).updateOne(
            query, {
                $push: {
                    [tier]: debate
                }
            }, {
                upsert: true
            }); // upsert creates the debate tier if it doesn't exist (it should after the first few inserts)
        return result;
    }

    async addAnalysis(username, tier, question, answer) {
        let analysis = new Analysis(username, tier, question, answer, new Date());
        let query = { "tier": tier }
        let result = await mongoConnect.getDBCollection(ANALYSES).updateOne(
            query, {
                $push: {
                    [tier]: analysis
                }
            }, {
                upsert: true
            }); // upsert creates the debate tier if it doesn't exist (it should after the first few inserts)
        return result;
    }

}

module.exports = DatabaseCreate;