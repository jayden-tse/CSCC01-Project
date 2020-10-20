const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://SPORTCRED:1234@sportcred.q4w2z.mongodb.net/SPORTCRED?retryWrites=true&w=majority";
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');

const a = require('./back-end/model/DatabaseRead');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


async function main() {
    try {
        await client.connect();
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(bodyParser.json());

        app.get('/', (req, res) => {
            console.log("Connected!");
            res.send('Hello World!')
        });

        // app.get('/abc', (req, res, next) => {
        //     passport.authenticate('local',
        //         function(err, user, info) {
        //             console.log(user);
        //             if (err) { return next(err); }
        //             if (!user) { return res.redirect('/'); }
        //             req.logIn(user, function(err) {
        //                 if (err) { return next(err); }
        //                 return res.redirect('/');
        //             });
        //         }
        //     )(req, res, next);
        // });

        app.get('/login', function(req, res, next) {
            passport.authenticate('local', function(err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.redirect('/'); }
                req.logIn(user, async function(err) {
                    if (err) { return next(err); }
                    return res.redirect('/users/' + user.username);
                });
            })(req, res, next);

        });

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        });
    } catch (e) {
        console.error(e);
    } finally {
        // await client.close();
    }
}

main().catch(console.err);