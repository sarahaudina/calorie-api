var authServiceInterface = require('../../../application/services/auth.service');
var authServiceImpl = require ('../../services/auth.service');

function authMiddleware(req, res, next) {
    // Get token from header
    const token = req.header('Authorization');
    const authService = authServiceInterface(authServiceImpl());
    if (!token) {
      throw new Error('No access token found');
    }
    if (token.split(' ')[0] !== 'Bearer') {
      throw new Error('Invalid access token format');
    }
    try {
      const decoded = authService.verify(token.split(' ')[1]);
      req.user = decoded.user;
      req.user.isAdmin = decoded.isAdmin;
      next();
      
    } catch (err) {
      throw new Error('Token is not valid');
    }
}

function isAdmin (req, res, next) {
  if (req.user.isAdmin) {
    next();
  } else {
    throw new Error('Require admin role');
  }
}

function verifyUser (req, res, next) {
  if (req.user.isAdmin) {
    next();
  } 
  else {
    if (req.query['userId'] === req.user.id) {
      next();
    } 
    else {
      throw new Error('Invalid id');
    }
  }
}

module.exports = {authMiddleware, isAdmin, verifyUser}