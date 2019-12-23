const passport = require('passport');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const config = require('../config/server.config');
const jwt_helper = require('../common/jwt-helper');


// MARK: - Facebook Auth

exports.authFacebook = passport.authenticate('facebook', {
    scope: 'email'
});

exports.facebookCallback = function(req, res) {
    passport.authenticate('facebook', function(err, user, info) {
        if (err) { return res.status(401).json(err); }
        if (!user) { return res.status(404).json({ message: "Cannot process the request." }); }
        let token = jwt_helper.signToken(user);
        res.setHeader('Authorization', 'Bearer '+ token);
        // return res.status(200).json({ message: 'Auth token has been specified' });
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Auth token has been specified');
    })(req, res);
};


// MARK: - Auth Middleware

exports.checkToken = function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['Authorization'] || req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Auth token did not provide' });
    }
    token = token.substr(7);
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: 'Auth token did not verify' });
        }
        req.decoded = decoded;
        next();
    });
};

exports.findMatchUser = function (req, res, next) {
    Users.getAuthProvider(req.decoded.provider_id, function (err, providerName) {
        Users.getUserByAuthID(providerName, req.decoded.user_social_id, function (user, err) {
            if (err) {
                return res.status(500).json({ message: 'User does not exist' });
            }
            if (!user) {
                return res.status(401).json({ message: 'User does not exist' });
            }
            req.user = user;
            next();
        });
    });
};