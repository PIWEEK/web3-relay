var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var storage = require('./storage');


// Configure passport with a strategy based of local storage.
// The storage needs a function that verifies an account name an password.
passport.use(new Strategy({
        userNameField: 'name',
        passwordField: 'password',
        session: true,
    },
    function(name, password, callback) {
        storage.getAccount(name, function(err, account) {
            if (err) {
                if (err.notFound) {
                    return callback(null, false);
                } else {
                    return callback(err);
                }
            }
            if (account.password !== password) {
                return callback(null, false);
            } else {
                return callback(null, account);
            }
        });
    }
));


// Configure persistence of an account into a session.
passport.serializeUser(function(account, callback) {
    callback(null, account.name);
});

passport.deserializeUser(function(name, callback) {
    storage.getAccount(name, function (err, account) {
        if (err) { return callback(err); }
        callback(null, account);
    });
});


exports.initialize = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
}
