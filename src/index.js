var mongoConnect = require('./mongoConnect');

const express = require('express');
const app = express();
const port = 8080;

const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const router = require('./routes')

async function main() {
    try {
        mongoConnect.connectToServer(function(err, client) {
            if (err) console.log(err);
            app.use(bodyParser.json());
            app.use(expressValidator());
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