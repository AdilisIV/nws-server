const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user.router');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MARK: - Routes
app.use('/', indexRouter);
app.use('/user', userRouter);


module.exports = app;
