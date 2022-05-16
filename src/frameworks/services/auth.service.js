var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require("../../config/config");

function authService() {
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const compare = (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword);

  const verify = (token) => jwt.verify(token, config.jwtSecret);

  const generateToken = (payload) =>
    jwt.sign(payload, config.jwtSecret, {
      expiresIn: 360000
    });

  return {
    encryptPassword,
    compare,
    verify,
    generateToken
  };
}

module.exports = authService