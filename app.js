var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyparser = require('body-parser')
var indexRouter = require('./routes/index');
var ticketRouter = require('./routes/bookTickets')
var updateTicketRouter = require('./routes/updateTicket')
var showTicketsRouter= require('./routes/showTickets');
var showTicketRouter= require('./routes/showTicket');
var deleteTicketRouter =  require('./routes/deleteTicket')
const config = require('./config')
const mongoose= require('mongoose');
const cron= require('node-cron')
const updatedDb= require('./updatedDb')
var app = express();
app.use(bodyparser.json())  
const url = config.MongoUrl
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log('connected to server');
}, (err) => {
  console.log(err);
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
cron.schedule('0 0 */1 * * *',()=>updatedDb())
app.use('/', indexRouter);
app.use('/tickets',ticketRouter);
app.use('/updateTickets',updateTicketRouter)
app.use('/showTickets',showTicketsRouter)
app.use('/showTicket',showTicketRouter)
app.use('/deleteTickets',deleteTicketRouter)
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
