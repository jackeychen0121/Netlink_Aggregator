import config from "./../../global.config";
import axios from "axios";

export async function verify_user() {
    const token = localStorage.getItem("OBAgg4user");
    let respond = {};
    await axios
      .post(`${config.verify_url}/auth/verify_user`, { token: token })
      .then((response) => {
        respond = response.data;
        console.log(respond)
      })
      .catch((error) => {
        console.log(error);
      });
    return respond.message;
  }