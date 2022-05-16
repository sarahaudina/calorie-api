function entryRepository(repository) {
    const add = (post) => repository.add(post);
    const findById = (id) => repository.findById(id);
    const findAll = (params) => repository.findAll(params);
    const findByProperty = (params) => repository.findByProperty(params);
    const updateById = (id, post) => repository.updateById(id, post);
    const deleteById = (id) => repository.deleteById(id);
    const countAll = (params) => repository.countAll(params);
  
    return {
        add,
        findById,
        findAll,
        findByProperty,
        updateById,
        deleteById,
        countAll
    };
}

module.exports = entryRepository;