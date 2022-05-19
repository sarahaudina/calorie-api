var moment = require("moment");

function entryService() {
    const countTotalBudgetSpending = (entries) => {
        var totalBudgetSpending = 0;
        entries.forEach(element => {
          if (element.createdAt.getMonth()===moment().toDate().getMonth()) {
            totalBudgetSpending += element.price ? element.price : 0;
          }
        });

        return totalBudgetSpending;
    };

    const countTotalCaloriesConsumption = (entries) => {
        var totalCaloriesConsumed = 0;
        entries.forEach(element => {
          if (datesAreOnSameDay(element.createdAt, moment().toDate())) {
            totalCaloriesConsumed += element.calories ? element.calories : 0;
          }
        });

        return totalCaloriesConsumed;
    };

    const datesAreOnSameDay = (first, second) =>
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate();

    const averageCaloriesConsumption = (entries) => {
        if (entries.size==0) {
          return 0;
        }

        var count = 0;
        var totalCaloriesConsumed = 0;
        var now = moment(new Date());
        entries.forEach(element => {
          if (moment.duration(now.diff(element.createdAt)).asHours() <= 7*24) {
            count+=1;
            totalCaloriesConsumed += element.calories ? element.calories : 0; 
          }
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
  