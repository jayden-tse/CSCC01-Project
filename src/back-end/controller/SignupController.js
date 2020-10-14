<<<<<<< HEAD
class SignupController {
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
        var mailOptions = {
            from: 'sportcredyes@gmail.com',
            to: user.email,
            subject: 'New Account',
            text: 'Your SportCred account has been created successfully.'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

}
=======
>>>>>>> df5a7df20ce51d39384e45396450b05594d86ea8
