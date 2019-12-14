const pg = require('pg');
let state = {
    db: null
};


exports.get = function () {
    return state.db;
};

exports.connect = function (url, done) {
    if (state.db) {
        return done();
    }

    const client = new pg.Client(url)
    client.connect(function (err, client) {
        if(err) {
            return done(err)
        }
        state.db = client;
        done();
    })

};