var mongoConnect = require('../../mongoConnect');

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    createUser(user, questionnaire) {
        let userProfile = new Profile('', '', '', questionnaire, 100);
        let hashedPassword = this.passwordHasher(user.password);
        user.password = hashedPassword;
        user.profile = userProfile;
        return user;
    }

    // Store the User into the database. Also check for unique contact info and send
    // the user confirmation when their account has been successfully created.
    async storeUser(user) {
        try {
            // Only store this user in the database if there exists no other accounts with
            // the same phone numbers and email.
            let newNum = await dbRead.findPhoneNum(user.phoneNum);
            let newEmail = await dbRead.findEmail(user.email);
            if (newNum && newEmail) {
                this.notifyUserForNewAccount(user);
                let result = await mongoConnect.getDBCollection("Users").insertOne(user);
            }
            else {
                console.error('An existing user has this email and/or phone number.')
            }
        } catch (e) {
            console.error(e);
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

    passwordHasher(password) {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }

    passwordChecker(password, hashedPassword) {
        let state = bcrypt.compareSync(password, hashedPassword);
        return state
    }
}

module.exports = DatabaseCreate;
