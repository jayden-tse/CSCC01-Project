import { BASE_URL } from './HttpClient.js';

/*ABOUT*/
export async function getUserAbout(username) {
  const newUrl = BASE_URL + '/profile';
  var fetchOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(newUrl, fetchOptions)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log('Error connecting to backend service: ' + error);
    });
}

export async function setUserAbout(message) {
  //user stored in backend
  const newUrl = BASE_URL + '/profile/update/about';
  var params = { about: message };
  var fetchOptions = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  };
  return fetch(newUrl, fetchOptions)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log('Error connecting to backend service: ' + error);
    });
}

/*ACS*/
export function getUserACS(username) {
  return 657;
}
export function getUserACSChange(username) {
  return 20;
}

/*Profile Picture*/

export function getUserPicture(username) {
  return 'https://www.ikea.com/ca/en/images/products/klappa-soft-toy-ball-multicolor__0873092_PE682669_S5.JPG';
}
export function setUserPicture(username, src) {
  return '';
}

/*Radar*/

/*Social*/

/*Status*/
export function getUserStatus(username) {
  return 'User status';
}

export async function setUserStatus(message) {
  //user stored in backend
  const newUrl = BASE_URL + '/profile/update/status';
  var params = { about: message };
  var fetchOptions = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  };
  return fetch(newUrl, fetchOptions)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log('Error connecting to backend service: ' + error);
    });
}
