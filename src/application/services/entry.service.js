function entryService (service) {
    const countTotalBudgetSpending = (entries) => service.countTotalBudgetSpending(entries);
    const countTotalCaloriesConsumption = (entries) => service.countTotalCaloriesConsumption(entries);
    const averageCaloriesConsumption = (entries) => service.averageCaloriesConsumption(entries);
    const countThisWeekEntry = (entries) => service.countThisWeekEntry(entries);
    const countPreviousWeekEntry = (entries) => service.countPreviousWeekEntry(entries);
    const countLastWeekActiveUser = (entries) => service.countLastWeekActiveUser(entries);

    return {
      countTotalBudgetSpending,
      countTotalCaloriesConsumption,
      averageCaloriesConsumption,
      countPreviousWeekEntry,
      countThisWeekEntry,
      countLastWeekActiveUser
    };
  }

  module.exports = entryService;