var EntryModel = require("../models/entry.model");

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

function entryRepositoryMongoDB() {
  const findByProperty = (params) => {
    return EntryModel.find(params)
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