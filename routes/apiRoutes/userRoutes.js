const router = require('express').Router();
const {
  filterByQuery,
  findById,
  createNewUser,
  validateUser
} = require('../../lib/users');
const { users } = require('../../data/users');

router.get('/users', (req, res) => {
  let results = users;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/users/:id', (req, res) => {
  const result = findById(req.params.id, users);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/users', (req, res) => {
  req.body.id = users.length.toString();

  if (!validateUser(req.body)) {
    res.status(400).send('The user is not properly formatted.');
  } else {
    const user = createNewUser(req.body, users);
    res.json(user);
  }
});

module.exports = router;
