const db = require('../db/db');
const providers_dict = {
    "facebook": 1,
    "instagram": 2,
    "apple": 3
};

exports.getList = function(callback) {
    db.get().query('select * from users;', function (err, result) {
        if(err) {
            return callback(err);
        }
        console.log(result);
    })
};

exports.getUserByAuthID = function(authProvider, id, callback) {
    let q = "select * from user_social_auth auth\n" +
        "\tinner join auth_providers_dict dict on dict.id = auth.provider_id\n" +
        "\tinner join users on auth.user_id = users.id\n" +
        "\twhere dict.\"name\" = '"+authProvider+"'\n" +
        "\t\tand auth.social_id = "+id+"";

    db.get().query(q, function (err, result) {
        if(err) {
            return callback(null, err);
        }
        if(result.rows.length == 0) {
            return callback(null, null);
        }
        let user = result.rows[0];
        callback(user, null);
    })
};

exports.authorization = function (user, callback) {
    db.get().query('INSERT INTO users (email, first_name, last_name, gender) values ($1, $2, $3, $4)',
        [user.email, user.first_name, user.last_name, user.gender],
        function (err, result) {
            if(err) {
                callback(null, err);
            }
            const userData = result.rows[0];

            db.get().query('INSERT INTO user_social_auth (user_id, provider_id, user_social_id, user_social_token) values ($1, $2, $3, $4)',
                [userData.id, providers_dict[user.provider_name], user.id, user.token],
                function (err, result) {
                    if(err) {
                        callback(null, err);
                    }
                    return callback(result.rows[0]);
                })
        })
};