function login(username, password, userRepository, authService) {
    if (!username || !password) {
      const error = new Error('username and password fields cannot be empty');
      error.statusCode = 401;
      throw error;
    }

    return userRepository.findByProperty({ username }).then((user) => {
      if (!user.length) {
        const error = new Error('Invalid username or password');
        error.statusCode = 401;
        throw error;
      }
      const isMatch = authService.compare(password, user[0].password);
      if (!isMatch) {
        const error = new Error('Invalid username or password');
        error.statusCode = 401;
        throw error;
      }

      const isAdmin = user[0].role === "admin" ? true : false;
      const payload = {
        user: {
          id: user[0].id,
          dailyCaloryLimit: user[0].dailyCaloryLimit,
          monthlyBudget: user[0].monthlyBudget  
        },
        isAdmin: isAdmin,
      };

      var result = {
        accessToken: authService.generateToken(payload),
        userId: user[0].id
      }

      return result;
    });
  }

  module.exports = login;