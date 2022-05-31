var express = require('express');
var mongoose = require('mongoose');

var config = require('./src/config/config.js');
var expressConfig = require('./src/frameworks/webserver/express');
var routes = require('./src/frameworks/webserver/routes/index.route');
var serverConfig = require('./src/frameworks/webserver/server');
var mongoDbConnection = require('./src/frameworks/database/mongoDB/connection');
var errorHandlingMiddleware = require('./src/frameworks/webserver/middlewares/error-handling.middleware');

const app = express();
const server = require('http').createServer(app);

// express configuration
expressConfig(app);

// server configuration and start
serverConfig(app, mongoose, server, config).startServer();

// mongoDB configuration and start connection
mongoDbConnection(mongoose, config, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).connectToMongo();

// routes for each endpoint
routes(app, express);

// error handling middleware
app.use(errorHandlingMiddleware);

module.exports = app;

