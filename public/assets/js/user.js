const $displayArea = document.querySelector('#display-area');

const printResults = resultArr => {
  console.log(resultArr);

  const storyHTML = resultArr.map(({ id, name, age, favoriteStory }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <p>Age: ${age}<br/>
      Favorite Story: ${favoriteStory.substring(0, 1).toUpperCase() +
        favoriteStory.substring(1)}<br/>
      </p>
    </div>
  </div>
    `;
  });

  $displayArea.innerHTML = animalHTML.join('');
};

const getUsers = () => {
  fetch('/api/users')
    .then(response => {
      if (!response.ok) {
        return alert('Error: ' + response.statusText);
      }
      return response.json();
    })
    .then(userArr => {
      console.log(userArr);
      printResults(userArr);
    });
};

getUsers();
