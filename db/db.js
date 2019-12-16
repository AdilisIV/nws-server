const { Pool } = require('pg');
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

    const pool = new Pool(url);

    pool.connect(function (err, pool) {
        if(err) {
            return done(err)
        }
        state.db = pool;
        done();
    })

};