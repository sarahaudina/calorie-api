var UserModel = require('../models/user.model');

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

function userRepositoryMongoDB() {
  const findByProperty = (params) =>
    UserModel.find(omit(params, 'page', 'perPage'))
      .skip(params.perPage * params.page - params.perPage)
      .limit(params.perPage);

  const countAll = (params) =>
    UserModel.countDocuments(omit(params, 'page', 'perPage'));

  const findById = (id) => UserModel.findById(id).select('-password');

  const add = (userEntity) => {
    const newUser = new UserModel({
      username: userEntity.getUserName(),
      password: userEntity.getPassword(),
      role: userEntity.getRole(),
      createdAt: new Date()
    });

    return newUser.save();
  };

  const updateById = (id, userEntity) => {
    const updatedUser = new UserModel({
      // id: id,
      // username: userEntity.username(),
      // password: userEntity.password(),
      // role: userEntity.role(),
      // createdAt: userEntity.createdAt(),
      // monthlyBudget: userEntity.monthlyBudget(),
      // dailyCaloryLimit: userEntity.dailyCaloryLimit()

      id: id,
      username: userEntity.getUserName(),
      password: userEntity.getPassword(),
      role: userEntity.getRole(),
      createdAt: userEntity.getCreatedAt(),
      monthlyBudget: userEntity.getMonthlyBudget(),
      dailyCaloryLimit: userEntity.getDailyCaloryLimit()
    });

    return UserModel.findOneAndUpdate(
      { _id: id },
      { $set: updatedUser },
      { new: true }
    );
  };

  const deleteById = (id) => UserModel.findByIdAndRemove(id);

  return {
    findByProperty,
    countAll,
    findById,
    add,
    updateById,
    deleteById
  };
}

module.exports = userRepositoryMongoDB;