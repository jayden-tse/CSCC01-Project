var mongoConnect = require('./mongoConnect');
var session = require('express-session');

const express = require('express');
const app = express();
const port = 8080;

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const router = require('./routes');

var passport = require('passport');
const { body } = require('express-validator/check');

async function main() {
    try {
        mongoConnect.connectToServer(function(err, client) {
            if (err) console.log(err);
            app.use(bodyParser.json());
            app.use(expressValidator());
            app.use(express.static("public"));
            app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
            app.use(passport.initialize());
            app.use(passport.session());
            app.use("", router);
            app.listen(port, () => {
                console.log(`Example app listening at http://localhost:${port}`)
            });
        });
    } catch (e) {
        console.error(e);
    }
}

main().catch(console.err);