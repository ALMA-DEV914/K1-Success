const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/stories', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/stories.html'));
});

router.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/users.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
