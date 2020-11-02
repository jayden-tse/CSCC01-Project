const startUrl = 'http://localhost:8080/login';

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
  return fetch(startUrl, fetchOptions)
    .then((res) => {
      console.log('response: ' + res.body.text);
      return res;
    })
    .catch((error) => {
      console.log('Error connecting to Login service: ' + error);
    });
}
