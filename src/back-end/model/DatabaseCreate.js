var mongoConnect = require('../../mongoConnect');

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Profile = require('./Profile.js');
const Post = require('./Post.js');

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
    async createPost(user, date, content, agrees, disagrees, comments) {
        let post = new Post(user, date, content, agrees, disagrees, comments);
        let result = await mongoConnect.getDBCollection(POSTS).insertOne(post);
    }

}

module.exports = DatabaseCreate;