var startUrl = "http://localhost:8080";

export async function login(username, password) {
  const newUrl = startUrl + "/login";
  return fetch(newUrl, {
    mode: "cors",
  })
    .then((res) => {
      //console.log("response: " + res.status);
      return res;
    })
    .catch(() => {
      console.log("Error connecting to Login service");
    });
}
