function entry({
  name,
  calories,
  createdAt,
  user,
  price,
}) {
    return {
      getName: () => name,
      getCalories: () => calories,
      getCreatedAt: () => createdAt,
      getUser: () => user,
      getPrice: () => price,
    };
}

module.exports = entry;