const passport = require('passport');

exports.auth = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(400).send('Incorrect username or password.');
        } else {
            req.logIn(user, async function(err) {
                if (err) {
                    return next(err);
                }
                // res.sendStatus(200);
                res.set({
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }).sendStatus(200);
            });
        }
    })(req, res, next);

};

exports.deauth = function(req, res, next) {
    if (req.user) {
        res.clearCookie('cookie');
        req.logout();
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}