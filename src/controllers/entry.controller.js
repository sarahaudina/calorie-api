var { addEntry, deleteById, findById, findByProperty, findAll, updateById, countAll } = require("../application/use_cases/entry.usecases");
var entryServiceImpl = require('../frameworks/services/entry.service');
var entryServiceInterface = require('../application/services/entry.service');

function entryController(
  entryRepository,
  entryRepositoryImpl
) {
  const dbRepository = entryRepository(entryRepositoryImpl());
  const entryService = entryServiceInterface(entryServiceImpl());

  // Fetch all entries of the logged in user
  const fetchAllEntries = (req, res, next) => {
    const params = {};
    const response = {};

    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        params[key] = req.query[key];
      }
    }

    // predefined query params (apart from dynamically) for pagination
    // and current logged in user
    params.page = params.page ? parseInt(params.page, 10) : 1;
    params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;
    params.userId = req.user.id;

    findAll(params, dbRepository)
      .then((entries) => {
        response.entries = entries;
        return countAll(params, dbRepository);
      }).then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.perPage);
        response.itemsPerPage = params.perPage;
        return res.json(response);
      })
      .catch((error) => next(error));
  };


  const fetchEntriesByProperty = (req, res, next) => {
    const params = {};
    const response = {};

    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        params[key] = req.query[key];
      }
    }

    params.page = params.page ? parseInt(params.page, 10) : 1;
    params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;

    findByProperty(params, dbRepository)
      .then((users) => {
        response.users = users;
        return countAll(params, dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.perPage);
        response.itemsPerPage = params.perPage;
        return res.json(response);
      })
      .catch((error) => next(error));
  };

  const fetchEntryById = (req, res, next) => {
    findById(req.params.id, dbRepository)
      .then((entry) => {
        if (!entry) {
          throw new Error(`No entry found with id: ${req.params.id}`);
        }
        res.json(entry);
      })
      .catch((error) => next(error));
  };

  const addNewEntry = (req, res, next) => {
    const { name, calories, createdAt, userId, price } = req.body;

    addEntry({
      name,
      calories,
      userId: req.user.isAdmin ? userId : req.user.id,
      createdAt,
      price: price ? price : null,
      entryRepository: dbRepository
    })
    .then((entry) => {
      // fetch user todays entries
      const params = {
        userId: req.user.isAdmin ? userId : req.user.id,
        createdAt: new Date().getDate()
      };

      findByProperty(
        params,
        dbRepository
      ).then((entries) => {
        // calculate total budget spending
        var totalBudgetSpending = 0;
        entries.forEach(element => {
          totalBudgetSpending += element.price ? element.price : 0;
        });
        // calculate total calories consumption
        var totalCaloriesConsumed = 0;
        entries.forEach(element => {
          totalCaloriesConsumed += element.calories ? element.calories : 0;
        });
        // compare total with user's daily limit
        const response = {
          'message': 'entry added',
          'dailyBudgetLimit': 2500-entryService.countTotalBudgetSpending(entries),
          'dailyCaloriesLimit': 2500-entryService.countTotalCaloriesConsumption(entries)
        };
  
        return res.json(response);
      })
    })
    .catch((error) => next(error));
  };

  const deleteEntryById = (req, res, next) => {
    deleteById(req.params.id, dbRepository)
      .then(() => res.json('entry sucessfully deleted!'))
      .catch((error) => next(error));
  };

  const updateEntryById = (req, res, next) => {
    const { id, name, calories, createdAt, userId, price } = req.body;

    updateById({
      id: id,
      name: name,
      calories: calories,
      userId: userId,
      createdAt: createdAt,
      price: price,
      entryRepository: dbRepository
    })
      .then((message) => res.json(message))
      .catch((error) => next(error));
  };

  return {
    fetchAllEntries,
    addNewEntry,
    fetchEntryById,
    updateEntryById,
    deleteEntryById,
    fetchEntriesByProperty
  };
}

module.exports = entryController;