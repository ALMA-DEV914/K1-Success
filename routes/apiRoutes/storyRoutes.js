const router = require('express').Router();
const { filterByQuery, findById, createNewStory, validateStory } = require('../../lib/stories');
const { stories } = require('../../data/stories');

router.get('/stories', (req, res) => {
  let results = stories;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/stories/:id', (req, res) => {
  const result = findById(req.params.id, stories);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/stories', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = stories.length.toString();

  if (!validateStory(req.body)) {
    res.status(400).send('The story is not properly formatted.');
  } else {
    const story = createNewStory(req.body, stories);
    res.json(story);
  }
});

module.exports = router;
