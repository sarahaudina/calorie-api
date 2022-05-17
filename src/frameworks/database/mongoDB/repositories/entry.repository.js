var EntryModel = require("../models/entry.model");
var moment = require("moment");

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

function entryRepositoryMongoDB() {
  const findByProperty = (params) => {
    var _param = omit(params, 'page', 'perPage');
    
    // processing filter by date param
    if (params.createdAt != null) {
      _param['createdAt'] = { 
        $gt: moment(params.createdAt).hours(0).minutes(0).seconds(0).milliseconds(0), 
        $lt: moment(params.createdAt).hours(24).minutes(0).seconds(0).milliseconds(0)
      };
    }
    if (params.fromDate != null && params.toDate != null) {
      _param['createdAt'] = { 
        $gt: moment(params.fromDate).hours(0).minutes(0).seconds(0).milliseconds(0), 
        $lt: moment(params.toDate).hours(24).minutes(0).seconds(0).milliseconds(0)
      };
    }

    return EntryModel.find(_param)
      .skip(params.perPage * params.page - params.perPage)
      .limit(params.perPage);
  }

  const countAll = (params) =>
    EntryModel.countDocuments(omit(params, 'page', 'perPage'));

  const findById = (id) => EntryModel.findById(id);

  const add = (entry) => {
    const newEntry = new EntryModel({
        name: entry.getName(),
        calories: entry.getCalories(),
        createdAt: entry.getCreatedAt(),
        price: entry.getPrice(),
        userId: entry.getUserId()
    });

    return newEntry.save();
  };

  const updateById = (id, entry) => {
    const updatedEntry = {
        id: id,
        name: entry.name(),
        calories: entry.calories(),
        createdAt: entry.createdAt(),
        price: entry.price(),
        userId: entry.userId()
    };

    return EntryModel.findOneAndUpdate(
      { _id: id },
      { $set: updatedEntry },
      { new: true }
    );
  };

  const deleteById = (id) => EntryModel.findByIdAndRemove(id);

  return {
    findByProperty,
    countAll,
    findById,
    add,
    updateById,
    deleteById
  };
}

module.exports = entryRepositoryMongoDB;