const tURL = "http://localhost:8080";

class LoginCalls {
  async loginAuthenticate(username, password) {
    const newURL = tURL + "/login";
    const userInput = { username: username, password: password };
    const formedRequest = { method: "GET", body: userInput };
    var result = fetch(newURL, formedRequest)
      //   .then((result) => result.json)
      .then((res) => {
        console.log(res);
      })
      .catch(() => console.log("error logging in"));
    console.log(result);
  }
}

export default new LoginCalls();
