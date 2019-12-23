const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('./facebook_creds');
const Users = require('../controllers/user');

module.exports = function (passport) {
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['emails', 'first_name', 'last_name', 'gender']
    },
    function (accessToken, refreshToken, profile, cb) {
        process.nextTick(function () {
            Users.authorizeFacebookUser(accessToken, refreshToken, profile, cb)
        })
    }));
};