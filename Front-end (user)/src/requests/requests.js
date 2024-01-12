import axios from "axios";
import config from "./../config";
const API_URL = config.backend;
function authHeader() {
  const userStr = localStorage.getItem("OBAgg");
  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user && user.token) {
    return { token: "Bearer " + user.token }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return { token: "" }; // for Spring Boot back-end
    // return { 'x-access-token': null }; // for Node Express back-end
  }
}

export async function login(name, accessToken) {
  let respond = {};
  const data = {
    accessToken: accessToken,
  };

  await axios
    .post(`${API_URL}/auth/signin4user`, data)
    .then((response) => {
      respond = response.data;
      localStorage.setItem(
        "OBAgg4user",
        JSON.stringify({ token: response.data.token, name: name })
      );
    })
    .catch((error) => {
      console.log(error);
    });
  return respond;
}
