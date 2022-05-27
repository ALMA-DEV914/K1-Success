const fs = require('fs');

const {
  filterByQuery,
  findById,
  createNewUser,
  validateUser
} = require('../lib/users.js');

jest.mock('fs');

test('creates an user object', () => {
  const user = createNewUser({ name: 'Darlene', id: 'jhgdja3ng2' }, []);

  expect(user.name).toBe('Darlene');
  expect(user.id).toBe('jhgdja3ng2');
});

test('filters by query', () => {
  const startingUsers = [
    {
      id: '2',
      name: 'Raksha',
      age: 31,
      favoriteStory: 'penguin and lion'
    },
    {
      id: '3',
      name: 'Isabella',
      age: 67,
      favoriteStory: 'bear and cat'
    }
  ];

  const updatedUsers = filterByQuery({ age: 31 }, startingUsers);

  expect(updatedUsers.length).toEqual(1);
});

test('finds by id', () => {
  const startingUsers = [
    {
      id: '2',
      name: 'Raksha',
      age: 31,
      favoriteStory: 'penguin and lion'
    },
    {
      id: '3',
      name: 'Isabella',
      age: 67,
      favoriteStory: 'bear and cat'
    }
  ];

  const result = findById('3', startingUsers);

  expect(result.name).toBe('Isabella');
});

test('validates age', () => {
  const user = {
    id: '2',
    name: 'Raksha',
    age: 31,
    favoritestory: 'penguin and lion'
  };

  const invalidUser = {
    id: '3',
    name: 'Isabella',
    age: '67',
    favoriteStory: 'bear and cat'
  };

  const result = validateUser(user);
  const result2 = validateUser(invalidUser);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
