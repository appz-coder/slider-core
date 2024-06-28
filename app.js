'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require("cookie-session");

// const passport = require('passport');
// require('./middlewares/passport');

const cors = require('cors');
const expressSession = require('express-session');    
const indexRouter = require('./routes/index');
const output = require('./helpers/generateOutput');

global.__basedir = __dirname;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', indexRouter);

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    if (err.code === 'LIMIT_FILE_SIZE') {
        return output(res, [], true, "Please, upload a file that's smaller than 20MB", 400);
    }
    return output(res, [], true, res.locals.message, 500);
});

module.exports = app;
