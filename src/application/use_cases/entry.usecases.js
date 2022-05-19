var entry = require('../../entities/entry');

function updateById({
    id,
    name,
    calories,
    createdAt,
    user,
    price,
    entryRepository
  }) {
    if (!name || !calories || !createdAt || !user) {
      throw new Error('Name, calories, creation date, and user id cannot be empty');
    }

    if (calories < 0) {
      throw new Error('Calories need to be positive value');
    }

    if (price!=null) {
      if (price < 0) {
        throw new Error('Price need to be positive value');
      }  
    }

    const updatedEntry = entry({ name, calories, createdAt, user, price });
  
    return entryRepository.findById(id).then((foundEntry) => {
      if (!foundEntry) {
        throw new Error(`No entry found with id: ${id}`);
      }
      return entryRepository.updateById(id, updatedEntry);
    });
}

function findByProperty(params, entryRepository) {
    return entryRepository.findByProperty(params);
}

function findById(id, entryRepository) {
    return entryRepository.findById(id);
}

function findAll(params, entryRepository) {
    return entryRepository.findAll(params);
}

function deleteById(id, entryRepository) {
    return entryRepository.findById(id).then((post) => {
      if (!post) {
        throw new Error(`No post found with id: ${id}`);
      }
      return entryRepository.deleteById(id);
    });
}

function addEntry({
    name,
    calories,
    createdAt,
    user,
    price,
    entryRepository
}) {
    if (!name || !calories || !createdAt || !user) {
      throw new Error('Name, calories, creation date, and user id cannot be empty');
    }

    if (calories < 0) {
      throw new Error('Calories need to be positive value');
    }

    if (price!=null) {
      if (price < 0) {
        throw new Error('Price need to be positive value');
      }  
    }

    const newEntry = entry({ name, calories, createdAt, user, price });

    return entryRepository.add(newEntry);

}

function countAll(params, entryRepository) {
  return entryRepository.countAll(params);
}

module.exports = { updateById, countAll, addEntry, deleteById, findAll, findById, findByProperty};
