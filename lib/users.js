const fs = require('fs');
const path = require('path');

function filterByQuery(query, users) {
  let filteredResults = users;

  if (query.age) {
    filteredResults = filteredResults.filter(user => user.age === query.age);
  }
  if (query.favoriteStory) {
    filteredResults = filteredResults.filter(
      user => user.favoritestory === query.favoriteStory
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(user => user.name === query.name);
  }
  return filteredResults;
}

function findById(id, users) {
  const result = users.filter(user => user.id === id)[0];
  return result;
}

function createNewUser(body, users) {
  const user = body;
  users.push(user);
  fs.writeFileSync(
    path.join(__dirname, '../data/users.json'),
    JSON.stringify({ users }, null, 2)
  );
  return user;
}

function validateUser(user) {
  if (!user.name || typeof user.name !== 'string') {
    return false;
  }
  if (!user.age || typeof user.age !== 'number') {
    return false;
  }
  if (!user.favoriteStory || typeof user.favoriteStory !== 'string') {
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNewUser,
  validateUser
};
