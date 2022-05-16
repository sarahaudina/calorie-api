var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var helmet = require('helmet');

function expressConfig(app) {
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000
    })
  );

  app.use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
    );
    // Pass to next layer of middleware
    next();
  });

  app.use(morgan('combined'));
}

module.exports = expressConfig;