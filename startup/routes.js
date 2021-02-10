const express = require('express');
const movies = require('../routes/movies');
const users = require('../routes/users');
const auth = require('../routes/auth');
const phases = require('../routes/phases');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/movies', movies);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/phases', phases);
  app.use(error);
}