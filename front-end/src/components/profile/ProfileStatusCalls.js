const startUrl = 'http://localhost:8080';

export function getUserStatus(username) {
  return 'User status';
}

export async function setUserStatus(message) {
  //user stored in backend
  const newUrl = startUrl + '/profile/update/status';
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
