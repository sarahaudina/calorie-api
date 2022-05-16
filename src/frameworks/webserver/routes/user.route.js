var userController = require('../../../controllers/user.controller');
var userRepository = require('../../../application/repositories/user.repository');
var userRepositoryMongoDB = require ('../../database/mongoDB/repositories/user.repository');
var authServiceInterface = require('../../../application/services/auth.service');
var authServiceImpl = require ('../../services/auth.service');
var { authMiddleware, isAdmin } = require('../middlewares/auth.middleware');

function userRouter (express) {
    const router = express.Router();
    const controller = userController(
      userRepository,
      userRepositoryMongoDB,
      authServiceInterface,
      authServiceImpl
    );
  
    // GET enpdpoints
    router.route('/:id').get(authMiddleware, controller.fetchUserById);
    router.route('/').get([authMiddleware, isAdmin], controller.fetchUsersByProperty);
  
    // POST enpdpoints
    router.route('/').post(controller.addNewUser);    

    router.route('/:id').put([authMiddleware, isAdmin], controller.updateUserById);
    
    return router;
  }

  module.exports = userRouter;