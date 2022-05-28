const fs = require('fs');
const path = require('path');

function filterByQuery(query, storiesArray) {
  let filteredResults = storiesArray;
  if (query.status) {
    filteredResults = filteredResults.filter(story => story.status === query.status )
  }
  if (query.processTime) {
    filteredResults = filteredResults.filter(story => story.processTime === query.processTime);
  }
  if (query.ageGap) {
    filteredResults = filteredResults.filter(story => story.ageGap === query.ageGap);
  }
  if (query.coupleName) {
    filteredResults = filteredResults.filter(story => story.coupleName === query.coupleName);
  }
  return filteredResults;
}

function findById(id, storiesArray) {
  const result = storiesArray.filter(story => story.id === id)[0];
  return result;
}

function createNewStory(body, storiesArray) {
  const story = body;
  storiesArray.push(story);
  fs.writeFileSync(
    path.join(__dirname, '../data/stories.json'),
    JSON.stringify({ storiesArray }, null, 2)
  );
  return story;
}

function validateStory(story) {
  if (!story.coupleName || typeof story.coupleName !== 'string') {
    return false;
  }
  if (!story.ageGap || typeof story.ageGap !== number) {
    return false;
  }
  if (!story.loveStory || typeof story.loveStory !== 'string') {
    return false;
  }

  if (!story.processTime || typeof story.processTime !== 'string') {
    return false;
  }
  if (!story.status || typeof story.status !== 'string'){
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNewStory,
  validateStory
};
