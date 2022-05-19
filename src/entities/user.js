function user(username, password, role, createdAt, monthlyBudget, dailyCaloryLimit, weeklyAverage) {
    return {
      getUserName: () => username,
      getPassword: () => password,
      getRole: () => role,
      getCreatedAt: () => createdAt,
      getMonthlyBudget: () => monthlyBudget,
      getDailyCaloryLimit: () => dailyCaloryLimit,
      getWeeklyAverage: () => weeklyAverage
    };
  }

module.exports = user;