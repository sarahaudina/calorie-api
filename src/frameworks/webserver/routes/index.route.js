var entryRouter = require('./entry.route');
var userRouter = require('./user.route');
var authRouter = require('./auth.route');

function routes(app, express) {
  app.use('/api/v1/entries', entryRouter(express));
  app.use('/api/v1/users', userRouter(express));
  app.use('/api/v1/login', authRouter(express));
}

module.exports = routes;