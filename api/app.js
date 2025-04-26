var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const {router} = require("./routes/landmarks");
const {visitedRouter} = require()

var app = express();
const port = process.env.PORT || 3000;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/landmarks", router);
app.use("/visited", );


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
