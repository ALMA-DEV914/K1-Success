const $storyForm = document.querySelector('#stories-form');
const $displayArea = document.querySelector('#display-area');

const printResults = resultArr => {
  console.log(resultArr);

  const storyHTML = resultArr.map(({ id, coupleName, ageGap, loveStory, processTime, status }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${coupleName}</h4>
      <p>Age gap: ${ageGap}</p>
      <p>Love Story: ${loveStory}</p>
      <p>Timeline: ${processTime.substring(0, 1).toUpperCase() + processTime.substring(1)}<br/>
      Status: ${status
        .map(status => `${status.substring(0, 1).toUpperCase() + status.substring(1)}`)
        .join(', ')}</p>
    </div>
  </div>
    `;
  });

  $displayArea.innerHTML = storyHTML.join('');
};

const getStories = (formData = {}) => {
  let queryUrl = '/api/stories?';

  Object.entries(formData).forEach(([key, value]) => {
    queryUrl += `${key}=${value}&`;
  });

  console.log(queryUrl);

};

const handleGetStoriesSubmit = event => {
  event.preventDefault();
  const processTimeRadioHTML = $storyForm.querySelectorAll('[name="processTime"]');
  let processTime;

  for (let i = 0; i <processTimeRadioHTML.length; i += 1) {
    if (processTimeRadioHTML[i].checked) {
     processTime = processTimeRadioHTML[i].value;
    }
  }

  if (processTime === undefined) {
    processTime = '';
  }

  const statusArr = [];
  const selectedStatus = $storyForm.querySelector('[name="status"').selectedOptions;

  for (let i = 0; i < selectedStatus.length; i += 1) {
   statusArr.push(selectedStatus[i].value);
  }

  const status = statusArr.join(',');

  const storyObject = { processTime, status };

  getStories(storyObject);
};

$storyForm.addEventListener('submit', handleGetStoriesSubmit);

getStories();
