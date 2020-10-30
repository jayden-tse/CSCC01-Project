const startUrl = 'http://localhost:8080';
export async function getUserAbout(username) {
  const newUrl = startUrl + '/profile';
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
  const newUrl = startUrl + '/profile/update/about';
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
