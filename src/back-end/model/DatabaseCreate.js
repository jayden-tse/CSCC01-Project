class DatabaseCreate {
    nodemailer = require('nodemailer');
    // const MongoClient = require('mongodb').MongoClient;
    // const URI = "mongodb+srv://SPORTCRED:1234@sportcred.q4w2z.mongodb.net/SPORTCRED?retryWrites=true&w=majority";
    // const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Business email from which users will get the confirmation.
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sportcredyes@gmail.com',
            pass: 'projectyes'
        }
    });

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

    bcrypt = require('bcrypt');
    saltRounds = 10;

    passwordHasher(password) {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }

    passwordChecker(password, hashedPassword) {
        let state = bcrypt.compareSync(password, hashedPassword);
        return state
    }

    uniqueEmail(client, mail) {
        let result = client.db("SPORTCRED").collection("Users").findOne({ "email": mail });
        console.log(result); // prints the document to console for now.
        return !result;
    }

    uniquePhoneNum(client, num) {
        let result = client.db("SPORTCRED").collection("Users").findOne({ "phoneNum": num });
        console.log(result); // prints the document to console for now.
        return !result;
    }
}