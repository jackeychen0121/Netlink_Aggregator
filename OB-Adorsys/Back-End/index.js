const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

let setCookie = '';
let access_token = '';

let currencies = [];
let iban = '';


app.post('/api/loginBank', async function (req, res) {
  let setCookie4bank = '';
  let access_token4bank = '';
  let accountInfo4bank = {};

  let setCookie = '';
  let access_token = '';

  let headers = req.body;

  await axios.post('https://support6x-modelbank-oba-ui.adorsys.kaas.cloudpunks.dev/oba-proxy/api/v1/login', {}, { headers })
    .then((response) => {

      setCookie4bank = response.headers['set-cookie'][0].split(';')[0];
      access_token4bank = response.headers.access_token;
    })
    .catch((error) => {
      console.log(error);
    });

  headers = {
    'Authorization': `Bearer ${access_token4bank}`,
    'Cookie': setCookie4bank
  };

  await axios.get('https://support6x-modelbank-oba-ui.adorsys.kaas.cloudpunks.dev/oba-proxy/api/v1/me', { headers })
    .then((response) => {
      accountInfo4bank = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  headers = {
    'Login': "12345",
    'Pin': '12345'
  };

  await axios.post('https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/login', {}, { headers })
    .then((response) => {
      setCookie = response.headers['set-cookie'][0].split(';')[0];
      access_token = response.headers.access_token;
    })
    .catch((error) => {
      console.log(error);
    });

  res.json({
    message:"Successfuly login",
    data:{
      cookie:setCookie,
      access_token:access_token,
      accountInfo:accountInfo4bank
    }
  })
});

app.post('/api/getEachBankAccount', async function (req, res) {
  const headers = {
    'Authorization': `Bearer ${req.body.access_token}`,
    'Cookie': req.body.cookie
  };

  await axios.get(`https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/accounts/report/${req.body.accountId}`, { headers })
    .then((response) => {
      res.json({
        message:"success",
        data:response.data
      })
    })
    .catch((error) => {
      res.json({
        message:"error",
        data:error.data
      })
    });
});

app.post('/api/deleteTransaction', async function (req, res) {
  const headers = {
    'Authorization': `Bearer ${req.body.access_token}`,
    'Cookie': req.body.cookie
  };
  
    await axios.delete(`https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/transactions/${req.body.accountId}`, { headers })
      .then((response) => {
        res.json({
          message:"success"
        })
      })
      .catch((error) => {
        res.json({
          message:"error",
          data:error.data
        })
      });
});

app.post('/api/deposit', async function (req, res) {
  const headers = {
    'Authorization': `Bearer ${req.body.access_token}`,
    'Cookie': req.body.cookie
  };
  

      const data = { 'amount': req.body.amount, currency: req.body.currency }
    
      await axios.post(`https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/accounts/${req.body.accountId}/deposit-cash`, data, { headers })
        .then((response) => {
          res.json({
            message:"success",
            data:response.data
          })
        })
        .catch((error) => {
          res.json({
            message:"error",
            data:error.data
          })
        });
});

app.listen(8001, function () {
  console.log('Server is running on port 8001');
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const createBankAccount = async () => {

  const getCurrencies = async () => {
    const headers = {
      'Authorization': `Bearer ${access_token}`,
      'Cookie': setCookie,
    };

    await axios.get('https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/currencies', { headers })
      .then((response) => {

        console.log('   Suc : get currencies list');
        currencies = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getIBAN = async () => {
    const headers = {
      'Authorization': `Bearer ${access_token}`,
      'Cookie': setCookie,
    };
    await axios.get('https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/data/generate/iban?tppId=GB_RKLT', { headers })
      .then((response) => {
        console.log('   Suc : get random iban');
        iban = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const main = async () => {
    const headers = {
      'Authorization': `Bearer ${access_token}`,
      'Cookie': setCookie,
    };

    await axios.post(`https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/accounts?userId=${accountInfo4bank.id}`,
      {
        'accountStatus': "ENABLED",
        'accountType': "CASH",
        'currency': currencies[0],
        'iban': iban,
        'usageType': "PRIV"
      }, { headers })
      .then((response) => {
        console.log(`Suc : make new bank account ${response.data}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  await getCurrencies();
  await getIBAN();
  await main();
}

const changeProfile = async () => {
  const headers = {
    'Authorization': `Bearer ${access_token}`,
    'Cookie': setCookie,
  };

  await axios.put('https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/users', accountInfo4bank, { headers })
    .then((response) => {

      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

const getAccountInfoTPP = async () => {
  const headers = {
    'Authorization': `Bearer ${access_token}`,
    'Cookie': setCookie
  };

  await axios.get('https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/users/me', { headers })
    .then((response) => {
      accountInfo = response.data;
      // console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const getBankAccountsListTPP = async () => {
  const headers = {
    'Authorization': `Bearer ${access_token}`,
    'Cookie': setCookie
  };

  await axios.get('https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/accounts/page?page=0&size=10&queryParam=&withBalance=true', { headers })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const getEachBankAccount = async () => {
  const headers = {
    'Authorization': `Bearer ${access_token}`,
    'Cookie': setCookie
  };

  await axios.get(`https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/accounts/report/${accountInfo4bank.accountAccesses[0].accountId}`, { headers })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const deposit = async () => {
  const headers = {
    'Authorization': `Bearer ${access_token}`,
    'Cookie': setCookie
  };

  const data = { 'amount': 77, currency: 'EUR' }

  await axios.post(`https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/accounts/${accountInfo4bank.accountAccesses[0].accountId}/deposit-cash`, data, { headers })
    .then((response) => {
      console.log('Suc : deposit');
    })
    .catch((error) => {
      console.log(error);
    });
}

const deleteDeposit = async () => {
  const headers = {
    'Authorization': `Bearer ${access_token}`,
    'Cookie': setCookie
  };

  await axios.delete(`https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/transactions/${accountInfo4bank.accountAccesses[0].accountId}`, { headers })
    .then((response) => {
      console.log('Suc : delete deposit');
    })
    .catch((error) => {
      console.log(error);
    });
}

const deleteBankAccount = async () => {
  const headers = {
    'Authorization': `Bearer ${access_token}`,
    'Cookie': setCookie
  };

  await axios.delete(`https://support6x-modelbank-tpp-ui.adorsys.kaas.cloudpunks.dev/tpp/account/${accountInfo4bank.accountAccesses[0].accountId}`, { headers })
    .then((response) => {
      console.log('Suc : delete deposit');
    })
    .catch((error) => {
      console.log(error);
    });
}

// const main = async () => {
//   await loginBank();
//   await getAccountInfo4bank();
//   await loginTPP();
//   // await getEachBankAccount();
//   await deleteDeposit();
//   // await createBankAccount();
//   // await changeProfile();
// }

// main();

// app.get('/', function (req, res) {
//   res.send('Home Page route');
// });

// app.get('/about', function (req, res) {
//   res.send('About Page route');
// });

// app.get('/headers', function (req, res) {
//   const headers = req.headers;

//   res.send(`Headers: ${JSON.stringify(headers)}`);
// });

// app.post('/data', function (req, res) {
//   const body = req.body;

//   res.setHeader('custom-header', 'custom value');

//   res.json(body);
// });

// app.get('/headers', function (req, res) {
//   const headers = req.headers;
//   res.send(`Headers: ${JSON.stringify(headers)}`);
// });