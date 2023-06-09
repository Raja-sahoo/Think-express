var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// own created
const mongoose = require("mongoose")
require("dotenv").config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// own created
var addUser = require("./routes/TaskRouter")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var cors = require('cors')

app.use('/', indexRouter);
app.use('/users', usersRouter);


//own created
app.use(cors())
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongoDb Connected"))
.catch((err)=>console.log(err))


// own created
app.use("/api", addUser);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
