var startUrl = "http://localhost:8080/login";

export async function login(username, password) {
  var newUrl = new URL(startUrl);
  var params = { username: username, password: password };
  newUrl.search = new URLSearchParams(params).toString();
  console.log(newUrl);
  return fetch(newUrl, {
    mode: "cors",
  })
    .then((res) => {
      console.log("response: " + res.body.text);
      return res;
    })
    .catch((error) => {
      console.log("Error connecting to Login service: " + error);
    });
}
