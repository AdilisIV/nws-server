const Users = require('../models/user');


exports.List = function(req, res) {
    Users.getList(function (err) {
        if(err) {
            console.log(err);
        }
    })
};

exports.getUserBy = function(req, res) {
    Users.getUserByAuthID('facebook', req.params.id, function (user, err) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            console.log(user);
            return res.send(user);
        }
    })
};

exports.authorizeFacebookUser = function (accessToken, refreshToken, profile, callback) {
    Users.getUserByAuthID("facebook", profile.id, function (err, user) {
        if(err) {
            callback(err, null);
        }
        if(user) {
            console.log("User already exists in database");
            callback(null, user);
        } else {
            let user = {
                id: profile.id,
                token: accessToken,
                provider_name: "facebook",
                email: profile.emails[0].value,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                gender: profile.gender,
            };
            console.log(user);
            Users.authorization(user, function (err, userAuthData) {
                if(err) {
                    console.log(err);
                    callback(err, null);
                }
                callback(null, userAuthData)
            })
        }
    })
};