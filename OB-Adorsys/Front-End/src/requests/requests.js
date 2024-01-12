import axios from "axios";
import config from "./../config";
const API_URL = config.backend;
const VERIFY_URL = config.verify_backend;

async function verify_user() {
  const token = localStorage.getItem("OBAgg4user");
  let respond = {};
  await axios
    .post(`${VERIFY_URL}/auth/verify_user`, { token: token })
    .then((response) => {
      respond = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return respond.message;
}

export async function loginBank(id, pin) {
  // const data = {
  //   Login: "GB_RKLT_DecoupledSca-2",
  //   Pin: "12345",
  // };
  const verify_code = await verify_user();
  if (verify_code !== "success") {
    return { message: verify_code };
  } else {
    let respond = {};
    const data = {
      Login: id,
      Pin: pin,
    };

    await axios
      .post(`${API_URL}/loginBank`, data)
      .then((response) => {
        respond = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return respond;
  }
}

export async function getEachBankAccount(access_token, cookie, accountId) {
  const verify_code = await verify_user();
  if (verify_code !== "success") {
    return { message: verify_code };
  } else {
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
    console.log(respond);
    return respond;
  }
}

export async function deleteTransaction(access_token, cookie, accountId) {
  const verify_code = await verify_user();
  if (verify_code !== "success") {
    return { message: verify_code };
  } else {
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
}

export async function deposit(access_token, cookie, accountId, amount, currency) {
  const verify_code = await verify_user();
  if (verify_code !== "success") {
    return { message: verify_code };
  } else {
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
}
