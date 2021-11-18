import '../style.css';

const submitBtn = document.querySelector('#submit');
const inputName = document.querySelector('#name');
const inputScore = document.querySelector('#score');
const refreshBtn = document.querySelector('#refresh');

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/RpJOyfVRNXw0MDhVPK99/scores/';

const postItem = async () => {
  (await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      user: inputName.value,
      score: inputScore.value,
    }),
  })).json();
};

const reciveData = async () => {
  const requestUrl = (await fetch(apiUrl).then((response) => response.json()));
  const reachedData = requestUrl.result;
  return reachedData;
};
submitBtn.addEventListener('click', () => {
  postItem();
});

const createElemen = (elements) => {
  document.querySelector('tbody').innerHTML = '';
  elements.forEach((x) => {
    const elementTr = document.createElement('tr');
    const elementThName = document.createElement('th');
    const elementThScore = document.createElement('th');
    elementThName.innerHTML = x.user;
    elementThScore.innerHTML = x.score;
    elementTr.appendChild(elementThName);
    elementTr.appendChild(elementThScore);
    document.querySelector('tbody').appendChild(elementTr);
  });
};
refreshBtn.addEventListener('click', () => {
  reciveData().then((result) => createElemen(result));
});
