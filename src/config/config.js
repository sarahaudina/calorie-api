module.exports  = {
    port: process.env.PORT || 1234,
    ip: process.env.HOST || '0.0.0.0',
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/calory'
    },
    jwtSecret: process.env.JWT_SECRET || 'jkl!±@£!@ghj1237'
};