const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user.router');
const auth_router = require('./routes/auth.router');

const passport = require('passport');
require('./config/passport.config')(passport);


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// MARK: - view engine setup
app.set('view engine', 'ejs');

// MARK: - Passport.js
app.use(passport.initialize());
app.use(passport.session());

// MARK: - Routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', auth_router);

// MARK: - Configure Passport authenticated session persistence.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log(user);
    done(null, user);
});


module.exports = app;
