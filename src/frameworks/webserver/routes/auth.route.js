var authController = require("../../../controllers/auth.controller");
var userRepository = require('../../../application/repositories/user.repository');
var userRepositoryMongoDB = require ('../../database/mongoDB/repositories/user.repository');
var authServiceInterface = require('../../../application/services/auth.service');
var authServiceImpl = require ('../../services/auth.service');

function authRouter(express) {
    const router = express.Router();
    const controller = authController(
      userRepository,
      userRepositoryMongoDB,
      authServiceInterface,
      authServiceImpl
    );
  
    // POST enpdpoints
    router.route('/').post(controller.loginUser);
  
    return router;
  }

  module.exports = authRouter;