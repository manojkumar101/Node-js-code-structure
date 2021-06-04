const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
global.rootDir = path.resolve(__dirname);


// view engine setup
app.set('views', path.join(__dirname, 'views'));

/**
 * Parse incoming request bodies in a middleware before your handlers,
 * available under the req.body property.
 */

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Parse Cookie header and populate req.cookies
app.use(cookieParser());

/**
 * CORS is a node.js package for providing a Connect/Express middleware
 * that can be used to enable CORS with various options.
 */
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

/**
 * apply to all requests
 * Note - Rate Limiter can be applied to any individual API also. For more information
 * Please visit https://www.npmjs.com/package/express-rate-limit
 */
// app.use(
//   rateLimit({
//     windowMs: 2 * 60 * 1000, // 2 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// );

// API Calling

app.use('/api', require('./api'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
