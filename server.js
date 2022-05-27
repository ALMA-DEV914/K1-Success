// call the express to run this code/file
const express = require('express');
// assign the url path/port
const PORT = process.env.PORT || 3001;
const app = express();
// call the routes for the files
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
// use middleware for the root of the file path
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// calling the port to functions
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
