import { BASE_URL } from './HttpClient.js';

export async function login(username, password) {
  var params = { username: username, password: password };
  var fetchOptions = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  };
  return fetch(BASE_URL + '/login', fetchOptions)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log('Error connecting to Login service: ' + error);
    });
}
