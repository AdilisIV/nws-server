const jwt = require('jsonwebtoken');
const config = require('../config/server.config');


exports.signToken = function(userData) {
    // userData — (user_id, provider_id, user_social_id, user_social_token)
    return jwt.sign({ user_id: userData.user_id, provider_id: userData.provider_id, user_social_id: userData.user_social_id, user_social_token: userData.user_social_token },
        config.secret,
        { expiresIn: '5d' }
    );
};