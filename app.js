'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const sequelize = require('./models').sequelize;
const auth = require('basic-auth');

 // testing sequelize connection
 sequelize
 .authenticate()
 .then(() => {
   console.log('Connection has been established successfully.');
 })
 .catch(err => {
   console.error('Unable to connect to the database:', err);
 });

 sequelize.sync();
// const { Sequelize, Op, Model, DataTypes } = require("sequelize");


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';


// Router references

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');
const courseRouter = require('./routes/course');

// create the Express app
const app = express();

// Root routes
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
