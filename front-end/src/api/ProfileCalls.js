import { BASE_URL, ORIGIN } from './HttpClient.js';
//get
const PROFILE = '/profile',
  PICKS = '/profile/picks',
  TRACKER = '/profile/tracker',
  PICTURE = '/profile/picture',
  //update
  UPDATEPICTURE = '/profile/update/picture',
  UPDATEABOUT = '/profile/update/about',
  UPDATESTATUS = '/profile/update/status',
  UPDATEPICKS = '/profile/update/picks',
  UPDATETRACKER = '/profile/update/tracker',
  DELETETRACKER = '/profile/delete/tracker';

/*ABOUT*/
export async function getUserAbout() {
  const newUrl = BASE_URL + PROFILE;
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
  const newUrl = BASE_URL + UPDATEABOUT;
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
  let newUrl = new URL(BASE_URL + PROFILE);
  const params = { username: username };
  newUrl.search = new URLSearchParams(params).toString();
  return fetch(newUrl, fetchOptionsGet())
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log('Error connecting to backend service: ' + error);
    });
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
    const newUrl = BASE_URL + UPDATESTATUS;
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

function fetchOptionsGet(){
    return {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': ORIGIN,
        },
        withCredentials: true,
        credentials: 'include',
      };
}

function fetchOptionsWithBody(method, body){
    return {
        method: method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': ORIGIN,
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(body),
      };
}

