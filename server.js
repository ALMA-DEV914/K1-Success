const express = require('express');
const {stories} = require('./data/stories');

const app = express();

function filterByQuery(query, storiesArray ){
    let processTimeArray = [];
    // Note that we save the storiesArray as filteredResults here:
    let filteredResults = storiesArray;

    if(query.processTime){
        // Save processTime as a dedicated array.
    // If processTime is a string, place it into a new array and save.
        if(typeof query.processTime === 'string'){
            processTimeArray = [query.processTime]
        } else {
            processTimeArray = query.processTime
        }
        // Loop through each trait in the processTime array:

        processTimeArray.forEach(processTime => {
            // Check the trait against each story in the filteredResults array.
      // Remember, it is initially a copy of the storiesArray,
      // but here we're updating it for each processTime in the .forEach() loop.
      // For each processTime being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the process time,
      // so at the end we'll have an array of stories that have every one 
      // of the processTime when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(story => story.processTime.indexOf(processTime) !== -1)
        });
    }

    if(query.status){
        filteredResults = filteredResults.filter(story => story.status === query.status);
    }
    if(query.photo){
        filteredResults = filteredResults.filter(story => story.processTime === query.photo)
    }
    if(query.name){
        filteredResults = filteredResults.filter(story => story.name === query.name)
    }
    return filteredResults;
}

app.get('/api/stories', (req, res) => {
    let results = stories;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
})

app.listen(3001, () => {
    console.log("API server now on 3001")
})