var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  role: {
    type: String,
    default: 'test_user'
  },
  createdAt: Date,
  monthlyBudget: {
    type: Number,
    default: 1000
  },
  dailyCaloryLimit: {
    type: Number,
    default: 2100
  }
});

UserSchema.index({ role: 1 });

const UserModel = mongoose.model('User', UserSchema);

UserModel.ensureIndexes((err) => {
  if (err) {
    return err;
  }
  return true;
});

module.exports = UserModel;