const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://SPORTCRED:1234@sportcred.q4w2z.mongodb.net/SPORTCRED?retryWrites=true&w=majority";
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const app = express();
const port = 8080;

async function main() {
    try {
        await client.connect();
        app.get('/', (req, res) => {
            console.log("Connected!");
            res.send('Hello World!')
        });
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.err);