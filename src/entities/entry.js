function entry({
  name,
  calories,
  createdAt,
  userId,
  price
}) {
    return {
      getName: () => name,
      getCalories: () => calories,
      getCreatedAt: () => createdAt,
      getUserId: () => userId,
      getPrice: () => price
    };
}

module.exports = entry;