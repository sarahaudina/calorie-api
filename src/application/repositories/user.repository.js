function userRepository(repository) {
    const add = (user) => repository.add(user);
    const findAll = (params) => repository.findAll(params);
    const findByProperty = (params) => repository.findByProperty(params);
    const deleteById = (id) => repository.deleteById(id);
    const countAll = (params) => repository.countAll(params);
    const updateById = (id, user) => repository.updateById(id, user);
    const findById = (id) => repository.findById(id);
  
    return {
        add,
        findAll,
        findByProperty,
        deleteById,
        countAll,
        updateById,
        findById
    };
  }

  module.exports = userRepository;