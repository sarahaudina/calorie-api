function user(username, password, role, createdAt, monthlyBudget, dailyCaloryLimit) {
    return {
      getUserName: () => username,
      getPassword: () => password,
      getRole: () => role,
      getCreatedAt: () => createdAt,
      getMonthlyBudget: () => monthlyBudget,
      getDailyCaloryLimit: () => dailyCaloryLimit
    };
  }

module.exports = user;