const db = require("../models");
const Account = db.accounts;


exports.token_generate = async (req, res) => {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const allCharacters = uppercaseLetters + lowercaseLetters + numbers;

  // Start by picking one character from each category to ensure variety
  let randomString = 
    uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length)) +
    lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length)) +
    numbers.charAt(Math.floor(Math.random() * numbers.length));

  // Fill the rest of the string length with random characters from all categories
  for (let i = 3; i < 300; i++) {
    randomString += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
  }

  // Shuffle the string to mix the initially added characters
  randomString = randomString.split('').sort(() => 0.5 - Math.random()).join('');
  await Account.findByIdAndUpdate(req.userId, {$set:{access_token:randomString}});

  res.send({ access_token: randomString});
};