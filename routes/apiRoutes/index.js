const router = require('express').Router();
const storyRoutes = require('../apiRoutes/storyRoutes');

router.use(storyRoutes);

module.exports = router;
