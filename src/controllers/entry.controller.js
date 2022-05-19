var { addEntry, deleteById, findById, findByProperty, findAll, updateById, countAll } = require("../application/use_cases/entry.usecases");
var entryServiceImpl = require('../frameworks/services/entry.service');
var entryServiceInterface = require('../application/services/entry.service');
var moment = require("moment");

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

    params.page = params.page ? parseInt(params.page, 10) : null;
    params.perPage = params.perPage ? parseInt(params.perPage, 10) : null;
    params.userId = req.user.id;

    findAll(params, dbRepository)
      .then((entries) => {
        response.entries = entries;
        return countAll(params, dbRepository);
      }).then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = params.perPage==null ? 1 : Math.ceil(totalItems / params.perPage);
        response.itemsPerPage = params.perPage ?? totalItems;
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

    params.page = params.page ? parseInt(params.page, 10) : null;
    params.perPage = params.perPage ? parseInt(params.perPage, 10) : null;
    
    // processing filter by date param
    if (params.createdAt != null) {
      params.createdAt = { 
        $gt: moment(params.createdAt).hours(0).minutes(0).seconds(0).milliseconds(0), 
        $lt: moment(params.createdAt).hours(24).minutes(0).seconds(0).milliseconds(0)
      };
    }
    if (params.fromDate != null && params.toDate != null) {
      params.createdAt = { 
        $gt: moment(params.fromDate).hours(0).minutes(0).seconds(0).milliseconds(0), 
        $lt: moment(params.toDate).hours(24).minutes(0).seconds(0).milliseconds(0)
      };
    }

    findByProperty(params, dbRepository)
      .then((entries) => {
        response.entries = entries;

        if (!req.user.isAdmin) {
          response.dailyBudgetLimitLeft = req.user.monthlyBudget-entryService.countTotalBudgetSpending(entries);
          response.dailyCaloriesLimitLeft = req.user.dailyCaloryLimit-entryService.countTotalCaloriesConsumption(entries);
          response.monthlyBudget = req.user.monthlyBudget;
          response.dailyCaloryLimit = req.user.dailyCaloryLimit;
        } 

        return countAll(params, dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = params.perPage==null ? 1 : Math.ceil(totalItems / params.perPage);
        response.itemsPerPage = params.perPage ?? totalItems;
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
    const { name, calories, createdAt, userId, price } = req.body;
    const response = {};
    const params = {};

    updateById({
      id: req.params.id,
      name: name,
      calories: calories,
      userId: userId,
      createdAt: createdAt,
      price: price,
      entryRepository: dbRepository
    })
    .then((message) => {
      response.message = message;

      // recount user weekly average
      params.createdAt = { 
        $gt: moment().subtract(7, "days"), 
        $lt: moment()
      };
      params.userId = userId;
      return findByProperty(params, dbRepository);
    })
    .then((entries) => {
      return entryService.averageCaloriesConsumption(entries);
    })
    .then((userWeeklyAverage) => {
      response.userWeeklyAverage = userWeeklyAverage;
      return res.json(response);
    })
    .catch((error) => next(error));
  };

  const getEntryMetadata = (req, res, next) => {
    const params = {};
    const response = {};

    // setDateRage prev week 
    params.createdAt = { 
      $gt: moment().subtract(14, "days"), 
      $lt: moment().subtract(7, "days")
    };
    
    countAll(params, dbRepository)
      .then((countPrevWeek) => {
        response.countPrevWeek = countPrevWeek;
        // setDateRage this week
        params.createdAt = { 
          $gt: moment().subtract(7, "days"), 
          $lt: moment()
        }; 
        return countAll(params, dbRepository);
      })
      .then((countThisWeek) => {
        response.countThisWeek = countThisWeek;
        return res.json(response);
      })
      .catch((error) => next(error));
  };

  return {
    fetchAllEntries,
    addNewEntry,
    fetchEntryById,
    updateEntryById,
    deleteEntryById,
    fetchEntriesByProperty,
    getEntryMetadata
  };
}

module.exports = entryController;