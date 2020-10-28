var mongoConnect = require('../../mongoConnect');

const nodemailer = require('nodemailer');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const Profile = require('./Profile.js');

const DatabaseRead = require('./DatabaseRead.js');
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
        let userProfile = new Profile('', '', '', questionnaire, [], [], 100);
        user.profile = userProfile;
        let newNum = await dbRead.findPhoneNum(user.phoneNum);
        let newEmail = await dbRead.findEmail(user.email);
        console.log(newNum + " " + newEmail);
        if (newNum === null && newEmail === null) {
            this.notifyUserForNewAccount(user);
            let result = await mongoConnect.getDBCollection("Users").insertOne(user);
            return true;
        } else {
            return false;
        }
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

    // for backend testing ONLY
    // passwordHasher(password) {
    //     let salt = bcrypt.genSaltSync(saltRounds);
    //     let hashedPassword = bcrypt.hashSync(password, salt);
    //     return hashedPassword;
    // }
}

module.exports = DatabaseCreate;