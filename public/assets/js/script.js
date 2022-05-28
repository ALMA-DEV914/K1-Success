const $storyForm = document.querySelector('#story-form');

const handleStoryFormSubmit = event => {
  event.preventDefault();

  // getstory data and organize it
  const coupleName = $storyForm.querySelector('[name="couple-name"]').value;
  const ageGap = $storyForm.querySelector('[name="age-gap]').value;
  const loveStory = $storyForm.querySelector('[name="textarea"]').value;
  const processTimeRadioHTML = $storyForm.querySelectorAll('[name="time-input"]');
  let processTime;

  for (let i = 0; i < processTimeRadioHTML.length; i += 1) {
    if (processTimeRadioHTML[i].checked) {
      processTime = processTimeRadioHTML[i].value;
    }
  }

  if (processTime === undefined) {
    processTime = '';
  }

  const selectedStatus = $storyForm.querySelector('[name="status"').selectedOptions;
  const status = [];
  for (let i = 0; i < selectedStatus.length; i += 1) {
    status.push(selectedStatus[i].value);
  }
  const storyObject = { coupleName, ageGap, processTime, loveStory, status };

  fetch('/api/stories', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'apllication/json'
    },
    body: JSON.stringify(storyObject)
  })
.then(response => {
  if(response.ok){
    return response.json()
  }
  alert('Error:' + response.statusText)
})
.then(postResponse => {
  console.log(postResponse);
  alert('Thank you for sharing your story!')
})
};

$storyForm.addEventListener('submit', handleStoryFormSubmit);


