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
  
    // admin role only
    router.route('/').get([authMiddleware, isAdmin], controller.fetchUsersByProperty);
    router.route('/:id').get([authMiddleware, isAdmin], controller.fetchUserById);
    router.route('/:id').put([authMiddleware, isAdmin], controller.updateUserById);
    router.route('/:id').delete([authMiddleware, isAdmin], controller.deleteUserById);

    // all roles 
    router.route('/').post(controller.addNewUser);    
    
    return router;
  }

  module.exports = userRouter;