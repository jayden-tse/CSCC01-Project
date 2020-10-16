const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Business email from which users will get the confirmation.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sportcredyes@gmail.com',
        pass: 'projectyes'
    }
});
class DatabaseCreate {
    // MongoClient = require('mongodb').MongoClient;
    // URI = "mongodb+srv://SPORTCRED:1234@sportcred.q4w2z.mongodb.net/SPORTCRED?retryWrites=true&w=majority";
    // client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
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

    async uniqueEmail(client, mail) {
        let result = await client.db("SPORTCRED").collection("Users").findOne({ "email": mail });
        return result === null;
    }

    async uniquePhoneNum(client, num) {
        let result = await client.db("SPORTCRED").collection("Users").findOne({ "phoneNum": num });
        return result === null;
    }
}