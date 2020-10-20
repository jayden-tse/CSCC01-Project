exports.auth_get = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(400).send('Incorrect username or password.');
            return res.redirect('/');
        }
        req.logIn(user, async function(err) {
            if (err) {
                return next(err);
            }
            res.status(200);
            return res.redirect('/users/' + user.username);
        });
    })(req, res, next);
};

exports.logout = function(req, res, next) {
    req.logout();
    res.redirect('/');
}