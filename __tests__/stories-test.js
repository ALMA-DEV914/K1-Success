//call the file system functions to write the file
const fs = require('fs');
// call the functions to be executed and the file path
const { filterByQuery, findById, createNewStory,  validateStory } = require('../lib/stories.js');
const { stories } = require('../data/stories');
// call the mock functions to prevent writing on the file
jest.mock('fs');

// write the test to create the object of new animal
test('creates an story object', () => {
  const story = createNewStory({ coupleName: 'Darlene and Jack', id: 'jhgdja3ng2' }, stories);
// expected value to be return 
  expect(story.coupleName).toBe('Darlene and Jack');
  expect(story.id).toBe('jhgdja3ng2');
});

test('filters by query', () => {
  const startingStories = [
    {
      id: '3',
      coupleName: 'Erica and James',
      ageGap: 14,
     processTime: "1 year",
     loveStory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
     status: "Maried"
},
    {
      id: '4',
      coupleName: 'Noel and Jessica',
      ageGap: 8,
      processTime: '4-6 months',
      loveStory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
      status: "In-progress"
    }
  ];

  const updatedStories = filterByQuery({ ageGap: '8-9 months' }, startingStories);

  expect(updatedStories.length).toEqual(1);
});

test('finds by id', () => {
  const startingStories = [
    {
      id: '3',
      coupleName: 'Erica and James',
      ageGap: 14,
     processTime: "1 year",
     loveStory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
     status: "In-progress"
    
},
    {
      id: '4',
      coupleName: 'Noel and Jessica',
      ageGap: 8,
      processTime: '4-6 months',
      loveStory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
      status: "Maried"
    }
  ];

   
  const result = findById('3', startingStories);

  expect(result.name).toBe('Erica and James');
});

test('validates status', () => {
  const story = {
    id: '3',
    name: 'Erica and james',
    ageGap: 14,
     processTime: "1 year",
     loveStory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
     status: "Maried"
  };

  const invalidStory = {
    id: '3',
    name: 'Erica and James',
    ageGap: '14',
     processTime: "1 year",
     loveStory: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.',
     
  };

  const result = validateStory(story);
  const result2 = validateStory(invalidStory);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
