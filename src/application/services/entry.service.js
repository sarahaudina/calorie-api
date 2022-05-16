function entryService (service) {
    const countTotalBudgetSpending = (entries) => service.countTotalBudgetSpending(entries);
    const countTotalCaloriesConsumption = (entries) => service.countTotalCaloriesConsumption(entries);
    const averageCaloriesConsumption = (entries) => service.averageCaloriesConsumption(entries);
  
    return {
      countTotalBudgetSpending,
      countTotalCaloriesConsumption,
      averageCaloriesConsumption
    };
  }

  module.exports = entryService;