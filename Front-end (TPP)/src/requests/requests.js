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

export async function login(email, password) {
  let respond = {};
  const data = {
    email: email,
    password: password,
  };

  await axios
    .post(`${API_URL}/auth/signin`, data)
    .then((response) => {
      respond = response.data;
      localStorage.setItem("OBAgg", JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  return respond;
}

export async function getEachBankAccount(access_token, cookie, accountId) {
  const data = {
    access_token: access_token,
    cookie: cookie,
    accountId: accountId,
  };

  let respond = {};

  await axios
    .post(`${API_URL}/getEachBankAccount`, data)
    .then((response) => {
      respond = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return respond;
}

export async function deleteTransaction(access_token, cookie, accountId) {
  const data = {
    access_token: access_token,
    cookie: cookie,
    accountId: accountId,
  };

  let respond = {};

  await axios
    .post(`${API_URL}/deleteTransaction`, data)
    .then((response) => {
      respond = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return respond;
}

export async function deposit(access_token, cookie, accountId, amount, currency) {
  const data = {
    access_token: access_token,
    cookie: cookie,
    accountId: accountId,
    amount: amount,
    currency: currency,
  };

  let respond = {};

  await axios
    .post(`${API_URL}/deposit`, data)
    .then((response) => {
      respond = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return respond;
}

export async function signup(name, email, password) {
  let respond = {};
  const data = {
    name: name,
    email: email,
    password: password,
  };

  await axios
    .post(`${API_URL}/auth/signup`, data)
    .then((response) => {
      respond = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return respond;
}

export async function generate() {
  let respond = {};
  await axios
    .get(`${API_URL}/tpp/token_generate`, { headers: authHeader() })
    .then((response) => {
      respond = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return respond;
}

export async function getAllTPP() {
  let respond = {};
  await axios
    .get(`${API_URL}/admin/get_all_tpp`, { headers: authHeader() })
    .then((response) => {
      respond = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return respond;
}

export async function modify_allowance(each) {
  let respond = {};
  await axios
    .post(
      `${API_URL}/admin/modify_allowance`,
      { id: each._id, allowed: each.allowed },
      { headers: authHeader() }
    )
    .then((response) => {
      respond = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return respond;
}
