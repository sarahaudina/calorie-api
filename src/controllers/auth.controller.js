
const login = require("../application/use_cases/auth.usecases");

function authController(
    userRepository,
    userRepositoryImpl,
    authServiceInterface,
    authServiceImpl
  ) {
    const dbRepository = userRepository(userRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
  
    const loginUser = (req, res, next) => {
      const { username, password } = req.body;
      login(username, password, dbRepository, authService)
        .then((token) => res.json(token))
        .catch((err) => next(err));
    };
    return {
      loginUser
    };
  }

  module.exports = authController;