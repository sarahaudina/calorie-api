function entryService() {
    const countTotalBudgetSpending = (entries) => {
        var totalBudgetSpending = 0;
        entries.forEach(element => {
          totalBudgetSpending += element.price ? element.price : 0;
        });

        return totalBudgetSpending;
    };

    const countTotalCaloriesConsumption = (entries) => {
        var totalCaloriesConsumed = 0;
        entries.forEach(element => {
          totalCaloriesConsumed += element.calories ? element.calories : 0;
        });

        return totalCaloriesConsumed;
    };

    const averageCaloriesConsumption = (entries) => {
        if (entries.size==0) {
          return 0;
        }

        var count = 0;
        var totalCaloriesConsumed = 0;
        entries.forEach(element => {
          count+=1;
          totalCaloriesConsumed += element.calories ? element.calories : 0;
        });

        return totalCaloriesConsumed/count;
    };

    return {
        countTotalBudgetSpending,
        countTotalCaloriesConsumption,
        averageCaloriesConsumption
    };

}

module.exports = entryService;
  