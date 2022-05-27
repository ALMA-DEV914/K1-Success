const router = require('express').Router();
const storyRoutes = require('../apiRoutes/storyRoutes');
const userRoutes = require('../apiRoutes/userRoutes');

router.use(storyRoutes);
router.use(userRoutes);

module.exports = router;
